import { ApiProperty } from '@nestjs/swagger';
import { Platform } from '@src/common/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: '唯一标识用户的 ID',
    type: String,
  })
  id: string;

  @Column()
  @ApiProperty({
    description: '平台标识',
    type: Platform,
  })
  platform: Platform;

  @Column({ name: 'platform_user_id' })
  @ApiProperty({
    description: '平台用户 ID',
    type: String,
  })
  platformUserId: string;

  @Column({ name: 'user_name' })
  @ApiProperty({
    description: '用户名',
    type: String,
  })
  userName: string;

  @Column({ name: 'avatar_url', nullable: true })
  @ApiProperty({
    description: '用户头像 URL',
    type: String,
  })
  avatarUrl: string;

  @Column({ name: 'extra_info', type: 'json', nullable: true })
  @ApiProperty({
    description: '额外信息',
    type: 'object',
  })
  extraInfo: Record<string, any>;
}
