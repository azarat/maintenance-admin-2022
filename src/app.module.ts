import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { configuration } from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { QrModule } from './qr/qr.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        const { mongoUri: uri } = await configuration();
        return {
          uri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    AdminModule,
    AuthModule,
    TokenModule,
    QrModule
  ],
  controllers: [AppController],
})
export class AppModule { }
