import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Column } from "typeorm";

export class LoginDto {
  @ApiProperty({
    description: "Admin email",
    example: "johndoe@gmail.com",
  })
  @Column()
  @IsString()
  @IsNotEmpty({
    message: "Email is required",
  })
  @IsEmail({
    message: "Invalid email",
  })
  email: string;

  @ApiProperty({
    description: "Admin password",
    example: "12345678",
  })
  @Column()
  @IsString()
  @IsNotEmpty({
    message: "PAssword is required",
  })
  password: string;
}
