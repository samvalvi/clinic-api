import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { GetAdmin } from "./decorators/get-admin.decorator";
import { RegisterAdminDto, LoginDto } from "./dto";
import { Admin } from "./entities/admin.entity";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiConflictResponse({
    description: "Admin already exist",
  })
  @ApiCreatedResponse({
    description: "Admin created",
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @Post("register")
  async register(@Body() registerAdminDto: RegisterAdminDto) {
    return await this.authService.register(registerAdminDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard())
  @ApiOkResponse({
    description: "Admin info",
  })
  @Get("info")
  showInfo(@GetAdmin("email") email: string) {
    return {
      ok: true,
      message: "admin info",
      email: email,
    };
  }

  @ApiTags("admin")
  @ApiOkResponse({
    description: "Data succesfully fetched",
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiInternalServerErrorResponse({
    description: "Server error",
  })
  @Get()
  async findAll(): Promise<Admin[]> {
    return await this.authService.getAdmins();
  }
}
