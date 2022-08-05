import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from 'src/admin/admin.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [AdminModule, TokenModule, ConfigModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
