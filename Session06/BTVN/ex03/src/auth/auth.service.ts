import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private users: Array<{
    id: number;
    username: string;
    password: string;
    refreshToken?: string;
  }> = [];

  async register(username: string, plainPassword: string) {
    const hashedPassword = await argon2.hash(plainPassword);
    const newUser = { id: Date.now(), username, password: hashedPassword };
    this.users.push(newUser);
    return { id: newUser.id, username: newUser.username };
  }

  async login(username: string, plainPassword: string) {
    const user = this.users.find((u) => u.username === username);
    if (!user) throw new UnauthorizedException('Tài khoản không tồn tại');

    const isPasswordMatching = await argon2.verify(
      user.password,
      plainPassword,
    );
    if (!isPasswordMatching)
      throw new UnauthorizedException('Mật khẩu không chính xác');

    const payload = { sub: user.id, username: user.username };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    user.refreshToken = refreshToken;

    return {
      message: 'Đăng nhập thành công',
      accessToken,
      refreshToken,
    };
  }

  async refresh(clientRefreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(clientRefreshToken, {
        secret: 'my-super-secret-key',
      });

      const user = this.users.find(
        (u) => u.id === payload.sub && u.refreshToken === clientRefreshToken,
      );
      if (!user) {
        throw new UnauthorizedException(
          'Refresh token không tồn tại trong Database',
        );
      }

      const newPayload = { sub: user.id, username: user.username };
      const newAccessToken = await this.jwtService.signAsync(newPayload, {
        expiresIn: '15m',
      });
      const newRefreshToken = await this.jwtService.signAsync(newPayload, {
        expiresIn: '7d',
      });

      user.refreshToken = newRefreshToken;

      return {
        message: 'Gia hạn token thành công',
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException(
        'Refresh token đã hết hạn hoặc không hợp lệ',
      );
    }
  }
}
