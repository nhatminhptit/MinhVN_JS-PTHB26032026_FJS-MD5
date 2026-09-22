import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  private users: Array<{ id: number; username: string; password: string }> = [];

  async register(username: string, plainPassword: string) {
    const hashedPassword = await argon2.hash(plainPassword);

    const newUser = { id: Date.now(), username, password: hashedPassword };
    this.users.push(newUser);

    console.log(`Đã đăng ký thành công user: ${username}`);

    return { id: newUser.id, username: newUser.username };
  }

  async login(username: string, plainPassword: string) {
    const user = this.users.find((u) => u.username === username);
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại');
    }

    const isPasswordMatching = await argon2.verify(
      user.password,
      plainPassword,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Mật khẩu không chính xác');
    }

    console.log('--------------------------------------------------');
    console.log(`Tài khoản "${username}" đăng nhập THÀNH CÔNG!`);
    console.log('--------------------------------------------------');

    return {
      message: 'Đăng nhập thành công',
      user: { username: user.username },
    };
  }
}
