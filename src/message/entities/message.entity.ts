import { ApiProperty } from '@nestjs/swagger';
import { MessageType } from '@src/common/types';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInfo } from '../../user-info/entities/user-info.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: '唯一标识消息的 ID',
    type: String,
  })
  id: string;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.id)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    description: '用户ID',
    type: String,
  })
  userId: string;

  @Column()
  @ApiProperty({
    description: '消息类型',
    type: MessageType,
  })
  type: MessageType;

  @Column('text')
  @ApiProperty({
    description: '消息内容',
    type: String,
  })
  content: string;

  @Column({ name: 'is_from_user', type: 'boolean', default: true })
  @ApiProperty({
    description: '是否是用户发送的消息',
    type: Boolean,
  })
  isFromUser: boolean;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    description: '创建时间',
    type: Date,
  })
  createTime: Date;

  @Column({ name: 'extra_info', type: 'json', nullable: true })
  @ApiProperty({
    description: '额外信息',
    type: 'object',
  })
  extraInfo: Record<string, any>;
}
