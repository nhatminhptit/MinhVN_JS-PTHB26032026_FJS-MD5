import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpBlockMiddleware implements NestMiddleware {
  private readonly blacklist = ['::1', '127.0.0.1'];

  use(req: Request, res: Response, next: NextFunction) {
    const clientIp = req.ip as string;
    console.log(`[Security Middleware] Request đến từ IP: ${clientIp}`);

    if (this.blacklist.includes(clientIp)) {
      return res.status(403).send({
        statusCode: 403,
        error: 'Forbidden',
        message: 'IP của bạn đã bị chặn từ vòng gửi xe!',
      });
    }

    next();
  }
}
