import { Inject, Injectable } from '@nestjs/common';
import { MessageType } from '@src/common/types';
import WhatsApp from 'whatsapp';

@Injectable()
export class WhatsAppService {
  constructor(@Inject('WhatsApp_SDK') private readonly waClient: WhatsApp) {}

  async sendTextMessage(userId: number, content: string) {
    return this.waClient.messages.text(
      {
        body: content,
      },
      userId,
    );
  }

  async sendMediaMessage(
    userId: number,
    type: MessageType.IMAGE | MessageType.VIDEO,
    content: string,
  ) {
    const params = {
      link: content,
    };

    if (type === MessageType.IMAGE) {
      return this.waClient.messages.image(params, userId);
    } else {
      return this.waClient.messages.video(params, userId);
    }
  }
}
