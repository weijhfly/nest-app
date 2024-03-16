import { Module } from '@nestjs/common';
import { ConfigTestService } from './config-test.service';
import { ConfigTestController } from './config-test.controller';

@Module({
  controllers: [ConfigTestController],
  providers: [ConfigTestService],
})
export class ConfigTestModule {}
