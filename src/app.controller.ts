import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  @ApiTags('App')
  @Get()
  index(): string {
    return 'index';
  }
}
