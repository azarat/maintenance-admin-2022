import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';


@Controller()
export class AppController {

  @ApiExcludeEndpoint(true)
  @Get('/health')
  getHello(): string {
    return 'Hello World!';
  }
}
