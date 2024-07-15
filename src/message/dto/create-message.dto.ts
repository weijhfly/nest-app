import { ApiProperty } from '@nestjs/swagger';
import { MessageType } from '@src/common/types';

export class CreateMessageDto {
  @ApiProperty({
    description: '用户ID',
    type: String,
  })
  userId: string;

  @ApiProperty({
    description: '消息类型',
    type: String,
    enum: Object.values(MessageType),
  })
  type: MessageType;

  @ApiProperty({
    description: '消息内容',
    type: String,
  })
  content: string;

  @ApiProperty({
    description: '是否是用户发送的消息',
    type: Boolean,
  })
  isFromUser?: boolean;
}
