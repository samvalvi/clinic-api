import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    description: "Admin name",
    example: "John Doe",
  })
  @IsNotEmpty({
    message: "name is required",
  })
  @IsString({
    message: "Invalid name",
  })
  name: string;

  @ApiProperty({
    description: "Admin email",
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
    description: "Admin password",
    example: "12345678",
  })
  @IsNotEmpty({
    message: "Password is required",
  })
  @MinLength(8, {
    message: "Password is too short",
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "The password must have an Uppercase, lowercase letter and a number",
  })
  password: string;
}
