import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from '../../user/dto';

export class CreatePetDto {
  @ApiProperty({
    description: 'Pet name',
    example: 'Teddy',
  })
  @IsNotEmpty({
    message: 'Pet name is required',
  })
  @IsString({
    message: 'Invalid name',
  })
  name: string;

  @ApiProperty({
    description: 'Pet color',
    example: 'Coffee',
  })
  @IsNotEmpty({
    message: 'Pet color is required',
  })
  @IsString({
    message: 'Invalid color',
  })
  color: string;

  @ApiProperty({
    description: 'Pet age',
    example: 5,
  })
  @IsNotEmpty({
    message: 'Pet age is required',
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    description: 'Pet breed',
    example: 'Schnauzer',
  })
  @IsNotEmpty({
    message: 'Pet breed is required',
  })
  @IsString({
    message: 'Invalid breed',
  })
  breed: string;

  @ApiProperty({
    description: 'Pet owner information',
    example: {
      'name': 'John Doe',
      'email': 'johndoe@email.com',
      'phone': '+5068892-1272',
    }
  })
  @IsObject()
  user: CreateUserDto;
}
