import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: 'name', required: true })
  @IsString({ message: 'name 不是一个字符串' })
  name: string;

  @ApiProperty({ description: 'quantity', required: true })
  @IsInt({ message: 'age 不是一个数字' })
  @ApiProperty({
    description: '年龄',
  })
  age: number;
}
