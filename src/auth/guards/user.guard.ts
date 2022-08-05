import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { verifyUser } from '@day-drive/user-sdk/lib/cjs/index';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { token } = req.headers;
    if (!token) {
      throw new HttpException('Provide a token', HttpStatus.UNAUTHORIZED);
    }

    try {
      await verifyUser(
        await this.configService.get('userSdkUrl'),
        await this.configService.get('userSdkSecret'),
        token
      );
      return true;
    } catch (err) {
      throw new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED);
    }
  }
}