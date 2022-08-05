import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { QrService } from './qr.service';
import { QrController } from './qr.controller';
import { Qr, QrSchema } from './schemas/qr.schema';
import { QrDbRepository } from './qr-repository.db';
import { AdminModule } from 'src/admin/admin.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    AdminModule,
    MongooseModule.forFeature([{ name: Qr.name, schema: QrSchema }]),
    JwtModule.register({}),
    TokenModule,
    ConfigModule,
  ],
  providers: [QrService, QrDbRepository],
  controllers: [QrController]
})
export class QrModule { }
