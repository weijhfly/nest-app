import { Module } from '@nestjs/common';
import { MessageModule } from '../message/message.module';
import { UserInfoModule } from '../user-info/user-info.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [MessageModule, UserInfoModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
