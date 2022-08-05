import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { TokenService } from './token.service';
import { Token, TokenSchema } from './schemas/token.schema';
import { TokenDbRepository } from './token-db.repository';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    ConfigModule,
  ],
  providers: [TokenService, TokenDbRepository],
  exports: [TokenService, TokenDbRepository],
})
export class TokenModule { }
