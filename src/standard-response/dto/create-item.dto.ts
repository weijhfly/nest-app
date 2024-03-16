import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class ItemDto {
  @ApiProperty({ description: 'name', required: true })
  @IsNotEmpty({ message: 'name 不能为空' })
  @IsString({ message: 'name 不是一个字符串' })
  name: string;

  @ApiProperty({ description: 'quantity', required: true })
  @IsInt({ message: 'quantity 不是一个数字' })
  @Min(0, { message: 'quantity 不能小于0' })
  quantity: number;
}
