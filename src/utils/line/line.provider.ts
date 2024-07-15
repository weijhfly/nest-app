import { ClientConfig, messagingApi } from '@line/bot-sdk';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const LineSdkProvider: Provider = {
  provide: 'LINE_SDK',
  useFactory: (configService: ConfigService) => {
    const clientConfig: ClientConfig = {
      channelAccessToken: configService.get<string>('LINE_ACCESS_TOKEN'),
      channelSecret: configService.get<string>('LINE_SECRET'),
    };
    return new messagingApi.MessagingApiClient(clientConfig);
  },
  inject: [ConfigService],
};
