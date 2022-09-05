import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { UpdateUserDto } from '../../user/dto';

export class UpdatePetDto {
  @ApiProperty({
    description: 'Pet name',
    example: 'Teddy',
  })
  @IsOptional()
  @IsString({
    message: 'Invalid name',
  })
  name?: string;

  @ApiProperty({
    description: 'Pet color',
    example: 'Coffee',
  })
  @IsOptional()
  @IsString({
    message: 'Invalid color',
  })
  color?: string;

  @ApiProperty({
    description: 'Pet age',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({
    description: 'Pet breed',
    example: 'Schnauzer',
  })
  @IsOptional()
  @IsString({
    message: 'Invalid breed',
  })
  breed?: string;

  @ApiProperty({
    description: 'Pet owner',
    example: {
      'name': 'John Doe',
      'email': 'johndoe@email.com',
      'phone': '+5068892-1272',
    }
  })
  @IsOptional()
  @IsObject()
  user?: UpdateUserDto;
}
