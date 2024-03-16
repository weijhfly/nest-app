import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({
    description: '姓名',
    type: String,
  })
  name: string;

  @Column()
  @ApiProperty({
    description: '年龄',
    type: Number,
  })
  age: number;
}
