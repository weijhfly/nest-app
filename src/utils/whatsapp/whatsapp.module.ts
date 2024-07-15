import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WhatsAppService } from './whatsapp.service';
import { WhatsAppProvider } from './whatsapp.provider';

@Module({
  imports: [ConfigModule],
  providers: [WhatsAppService, WhatsAppProvider],
  exports: [WhatsAppService],
})
export class WhatsAppModule {}
