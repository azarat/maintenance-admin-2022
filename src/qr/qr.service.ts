import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verifyUser } from '@day-drive/user-sdk/lib/cjs/index';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

import { QrDbRepository } from './qr-repository.db';
import { AdminDbRepository } from 'src/admin/admin-db.repository';
import { Type } from './enums/type.enum';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class QrService {
  constructor(
    private readonly qrDbRepository: QrDbRepository,
    private readonly jwtService: JwtService,
    private readonly adminDbRepository: AdminDbRepository,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) { }

  async handleGenerateQr(token: string, serviceId: string): Promise<string> {
    const admin = await this.adminDbRepository.findByCockpitId(serviceId);

    if (!admin) {
      throw new HttpException('Company not found', HttpStatus.BAD_REQUEST);
    }

    const { id } = await verifyUser(
      await this.configService.get('userSdkUrl'),
      await this.configService.get('userSdkSecret'),
      token
    );
    await this.qrDbRepository.create(admin.id, id, Type.OPEN);
    return this.jwtService.signAsync(
      { user: id, admin: admin.id },
      { secret: await this.configService.get('qrSecret') },
    );
  }

  async handleScanQr(token: string, qr: string): Promise<void> {
    const admin = await this.tokenService.verifyToken(token);
    const { admin: company, user } = this.jwtService.verify(qr, {
      secret: await this.configService.get('qrSecret'),
    });

    if (admin !== company) {
      throw new HttpException('You doesn\'t belongs to this company', HttpStatus.FORBIDDEN);
    }
    await this.qrDbRepository.create(new Types.ObjectId(admin), user, Type.SCAN);
  }
}
