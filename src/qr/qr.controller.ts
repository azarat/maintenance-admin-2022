import { Controller, Post, UseGuards, Headers, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/guards/admin.guard';

import { UserGuard } from 'src/auth/guards/user.guard';
import { QrService } from './qr.service';

@Controller('qr')
@ApiTags('qr')
export class QrController {
  constructor(
    private readonly qrService: QrService,
  ) { }

  @ApiResponse({
    status: 200,
    type: String
  })
  @ApiResponse({
    status: 400,
    description: 'Сompany not found'
  })
  @ApiResponse({
    status: 401,
    description: 'You did not log in correctly'
  })
  @HttpCode(200)
  @UseGuards(UserGuard)
  @Post('generate/:serviceId')
  async generateQr(
    @Headers('token') token: string,
    @Param('serviceId') serviceId: string,
  ): Promise<string> {
    return this.qrService.handleGenerateQr(token, serviceId);
  }

  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 401,
    description: 'You did not log in correctly'
  })
  @ApiResponse({
    status: 403,
    description: 'You does not have access a company'
  })
  @HttpCode(200)
  @UseGuards(AdminGuard)
  @Post('scan')
  async scan(
    @Headers('token') token: string,
    @Headers('qr') qr: string,
  ): Promise<void> {
    return this.qrService.handleScanQr(token, qr);
  }
}
