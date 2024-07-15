import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacebookModule } from '@src/utils/facebook/facebook.module';
import { LineModule } from '@src/utils/line/line.module';
import { WhatsAppModule } from '@src/utils/whatsapp/whatsapp.module';
import { UserInfoModule } from '../user-info/user-info.module';
import { Message } from './entities/message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    UserInfoModule,
    FacebookModule,
    LineModule,
    WhatsAppModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
