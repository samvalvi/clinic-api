import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "User name",
    example: "John Doe",
  })
  @IsNotEmpty({
    message: "Name is required",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "User email",
    example: "johndoe@email.com",
  })
  @IsNotEmpty({
    message: "Email is required",
  })
  @IsEmail({
    message: "Invalid email",
  })
  email: string;

  @ApiProperty({
    description: "User phone",
    example: "+5068765-1234",
  })
  @IsNotEmpty({
    message: "Phone is required",
  })
  phone: string;
}
