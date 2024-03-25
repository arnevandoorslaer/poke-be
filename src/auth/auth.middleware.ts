import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly token = process.env.HARDCODED_TOKEN;

  use(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token || token !== `Bearer ${this.token}`) {
      throw new UnauthorizedException('Unauthorized');
    }

    next();
  }
}
