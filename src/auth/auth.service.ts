import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Types } from 'mongoose';

import { AdminService } from 'src/admin/admin.service';
import { AdminDto } from 'src/admin/dto/admin.dto';
import { TokenDbRepository } from 'src/token/token-db.repository';
import { TokenService } from 'src/token/token.service';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly tokenService: TokenService,
    private readonly tokenDbRepository: TokenDbRepository,
  ) { }

  async handleAuth(googleToken: string): Promise<AuthResponseDto> {
    const email = await this.getGoogleEmail(googleToken);
    const admin = await this.getAdmin(email);
    await this.tokenDbRepository.deleteTokenByAdmin(new Types.ObjectId(admin.id));
    const token = await this.tokenService.createJwt(new Types.ObjectId(admin.id));

    return {
      admin,
      token,
    };
  }

  async handleAuthToken(token: string): Promise<AuthResponseDto> {
    const id = await this.tokenService.verifyToken(token);
    const admin = await this.adminService.getStationById(id);
    await this.tokenDbRepository.deleteToken(token);
    return {
      admin,
      token: await this.tokenService.createJwt(new Types.ObjectId(id))
    };
  }

  private async getAdmin(email: string): Promise<AdminDto> {
    try {
      const admin = await this.adminService.getStationByEmail(email);
      return admin;
    } catch {
      return this.adminService.getStationByCockpitId(process.env.DEFAULT_STATION);
    }
  }

  private async getGoogleEmail(token: string): Promise<string> {
    try {
      const {
        data: { email },
      } = await axios.get<{ email: string }>(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
      );
      return email;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
