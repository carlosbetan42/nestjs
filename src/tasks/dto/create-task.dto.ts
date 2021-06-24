import {
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  user: number;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  status: boolean;
}
