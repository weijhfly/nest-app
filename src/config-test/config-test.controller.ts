import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigTestService } from './config-test.service';

@Controller('config-test')
export class ConfigTestController {
  constructor(
    private readonly configTestService: ConfigTestService,
    private readonly configService: ConfigService,
  ) {}

  @Get('1')
  getConfig1() {
    return this.configService.get('DATABASE_HOST');
  }

  // 不推荐使用
  @Get('2')
  getConfig2() {
    const configService = new ConfigService();

    return configService.get('DATABASE_NAME');
  }
}
