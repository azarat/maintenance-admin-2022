import { Controller, Get, Headers, HttpCode, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AdminGuard } from './guards/admin.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @ApiResponse({
    status: 200,
    type: AuthResponseDto
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
  @Get('sign-in')
  auth(@Headers('google-token') googleToken: string): Promise<AuthResponseDto> {
    return this.authService.handleAuth(googleToken);
  }

  @ApiResponse({
    status: 200,
    type: AuthResponseDto
  })
  @ApiResponse({
    status: 401,
    description: 'You did not log in correctly'
  })
  @ApiResponse({
    status: 403,
    description: 'You does not have access a company'
  })
  @ApiResponse({
    status: 503,
    description: 'Company does not exist'
  })
  @HttpCode(200)
  @UseGuards(AdminGuard)
  @Get('token')
  authToken(@Headers('token') token: string): Promise<AuthResponseDto> {
    return this.authService.handleAuthToken(token);
  }
}
