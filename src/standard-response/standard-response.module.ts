import { Module } from '@nestjs/common';
import { StandardResponseController } from './standard-response.controller';
import { StandardResponseService } from './standard-response.service';

@Module({
  controllers: [StandardResponseController],
  providers: [StandardResponseService],
})
export class StandardResponseModule {}
