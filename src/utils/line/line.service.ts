import { messagingApi } from '@line/bot-sdk';
import { Inject, Injectable } from '@nestjs/common';
import { MessageType } from '@src/common/types';

@Injectable()
export class LineService {
  constructor(
    @Inject('LINE_SDK')
    private readonly lineClient: messagingApi.MessagingApiClient,
  ) {}

  async sendTextMessage(userId: string, content: string) {
    return this.lineClient.pushMessage({
      to: userId,
      messages: [
        {
          type: MessageType.TEXT,
          text: content,
        },
      ],
    });
  }

  async sendMediaMessage(
    userId: string,
    type: MessageType.IMAGE | MessageType.VIDEO,
    content: string,
  ) {
    return this.lineClient.pushMessage({
      to: userId,
      messages: [
        {
          type,
          originalContentUrl: content,
          previewImageUrl: content,
        },
      ],
    });
  }
}
