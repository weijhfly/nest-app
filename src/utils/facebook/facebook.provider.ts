import * as Fb from 'fb';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const FacebookProvider: Provider = {
  provide: 'Facebook_SDK',
  useFactory: (configService: ConfigService) => {
    Fb.options({
      accessToken: configService.get('FACEBOOK_ACCESS_TOKEN'),
      version: configService.get('FACEBOOK_API_VERSION'),
    });

    return Fb;
  },
  inject: [ConfigService],
};
