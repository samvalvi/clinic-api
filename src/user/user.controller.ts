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
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";

import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { User } from "./entities/user.entity";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({
    description: "User created",
    type: User,
  })
  @ApiConflictResponse({
    description: "User already exist",
  })
  @ApiBadRequestResponse({
    description: "Server error",
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({
    description: "Data successfully fetched",
    type: User,
  })
  @ApiNotFoundResponse({
    description: "Data not found",
  })
  @ApiBadRequestResponse({
    description: "Server error",
  })
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({
    description: "User successfully fetched",
    type: User,
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiBadRequestResponse({ description: "Server error" })
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ description: "User successfully updated", type: User })
  @ApiBadRequestResponse({ description: "Server error " })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ description: "User successfully deleted", type: User })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiBadRequestResponse({ description: "Server error " })
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<User> {
    return await this.userService.remove(id);
  }
}
