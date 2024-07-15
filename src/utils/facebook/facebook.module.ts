import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FacebookService } from './facebook.service';
import { FacebookProvider } from './facebook.provider';

@Module({
  imports: [ConfigModule],
  providers: [FacebookService, FacebookProvider],
  exports: [FacebookService],
})
export class FacebookModule {}
