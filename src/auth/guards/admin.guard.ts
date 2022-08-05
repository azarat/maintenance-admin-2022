import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { TokenService } from 'src/token/token.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { token } = req.headers;
    await this.tokenService.verifyToken(token);
    return true;
  }
}