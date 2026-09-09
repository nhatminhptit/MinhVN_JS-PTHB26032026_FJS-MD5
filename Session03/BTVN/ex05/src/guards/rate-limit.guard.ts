import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RateLimitGuard implements CanActivate {
  private requestTracker = new Map<
    string,
    { count: number; resetTime: number }
  >();

  private readonly LIMIT = 10;

  private readonly WINDOW_MS = 60 * 1000;

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const clientIp = request.ip;
    const currentTime = Date.now();

    const record = this.requestTracker.get(clientIp);

    if (!record) {
      this.requestTracker.set(clientIp, {
        count: 1,
        resetTime: currentTime + this.WINDOW_MS,
      });

      return true;
    }

    if (currentTime > record.resetTime) {
      record.count = 1;
      record.resetTime = currentTime + this.WINDOW_MS;

      return true;
    }

    if (record.count >= this.LIMIT) {
      throw new HttpException(
        'Too Many Requests: Bạn đã vượt quá 10 request/phút',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    record.count++;
    console.log(
      `[Rate Limit] IP: ${clientIp} | Số request: ${record.count}/10`,
    );

    return true;
  }
}
