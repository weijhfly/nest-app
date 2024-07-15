import { Inject, Injectable } from '@nestjs/common';
import { FacebookMessage, MessageType } from '@src/common/types';
import * as Fb from 'fb';

@Injectable()
export class FacebookService {
  constructor(@Inject('Facebook_SDK') private readonly fbClient: typeof Fb) {}

  async sendTextMessage(userId: string, content: string) {
    const message: FacebookMessage = {
      recipient: { id: userId },
      message: { text: content },
    };
    return this.fbClient.api('/me/messages', 'POST', message);
  }

  async sendMediaMessage(
    userId: string,
    type: MessageType.IMAGE | MessageType.VIDEO,
    content: string,
  ) {
    const message: FacebookMessage = {
      recipient: { id: userId },
      message: {
        attachment: {
          type,
          payload: { url: content },
        },
      },
    };
    return this.fbClient.api('/me/messages', 'POST', message);
  }
}
