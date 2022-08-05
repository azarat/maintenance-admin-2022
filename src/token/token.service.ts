import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

import { TokenDbRepository } from './token-db.repository';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tokenDbRepository: TokenDbRepository,
  ) { }

  public async createJwt(adminId: Types.ObjectId): Promise<string> {
    const token = await this.jwtService.signAsync(
      { admin: adminId },
      { secret: await this.configService.get('jwtSecret') },
    );
    await this.tokenDbRepository.create(adminId, token);
    return token;
  }

  public async verifyToken(token: string): Promise<string> {
    if (!(await this.tokenDbRepository.existsByToken(token)))
      throw new HttpException(
        `This token doesn't exist`,
        HttpStatus.UNAUTHORIZED,
      );
    try {
      const { admin } = this.jwtService.verify(token, {
        secret: await this.configService.get('jwtSecret'),
      });
      return admin;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
