import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({
    description: "User name",
    example: "John Doe",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "User email",
    example: "johndoe@email.com",
  })
  @IsOptional()
  @IsEmail({
    message: "Invalid email",
  })
  email?: string;

  @ApiProperty({
    description: "User phone",
    example: "+5068792-3122",
  })
  @IsOptional()
  @IsString()
  phone?: string;
}
