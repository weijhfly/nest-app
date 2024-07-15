import { ApiProperty } from '@nestjs/swagger';
import { Platform } from '@src/common/types';

export class CreateUserInfoDto {
  @ApiProperty({
    description: '平台标识',
    type: String,
    enum: Object.values(Platform),
  })
  platform: Platform;

  @ApiProperty({
    description: '平台用户 ID',
    type: String,
  })
  platformUserId: string;

  @ApiProperty({
    description: '用户名',
    type: String,
  })
  userName: string;

  @ApiProperty({
    description: '用户头像 URL',
    type: String,
  })
  avatarUrl?: string;

  @ApiProperty({
    description: '额外信息',
    type: 'object',
    default: {},
  })
  extraInfo?: Record<string, any>;
}
