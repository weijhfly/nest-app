import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as WhatsApp from 'whatsapp';

export const WhatsAppProvider: Provider = {
  provide: 'WhatsApp_SDK',
  useFactory: (configService: ConfigService) => {
    const senderNumber = configService.get<number>('WHATSAPP_PHONE_NUMBER_ID');

    // WhatsApp sdk 要注入要注入这两个变量
    process.env.CLOUD_API_ACCESS_TOKEN = configService.get(
      'WHATSAPP_ACCESS_TOKEN',
    );
    process.env.CLOUD_API_VERSION = configService.get('WHATSAPP_API_VERSION');
    const wa = new (WhatsApp as unknown as any)(senderNumber);

    return wa;
  },
  inject: [ConfigService],
};
