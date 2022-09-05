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
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { PetService } from "./pet.service";
import { CreatePetDto, UpdatePetDto } from "./dto";
import { Pet } from "./entities/pet.entity";

@ApiTags("pet")
@Controller("pet")
export class PetController {
  constructor(private readonly petService: PetService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({ description: "Pet successfully created", type: Pet })
  @ApiConflictResponse({ description: "Pet already exist" })
  @ApiBadRequestResponse({ description: "Bad request" })
  @Post()
  async create(@Body() createPetDto: CreatePetDto): Promise<Pet> {
    return await this.petService.createPet(createPetDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ description: "Data successfully fetched", type: Pet })
  @ApiNoContentResponse({ description: "No content founded" })
  @ApiBadRequestResponse({ description: "Bad request" })
  @Get()
  async findAll(): Promise<Pet[]> {
    return await this.petService.getAllPets();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ description: "Pet successfully founded", type: Pet })
  @ApiNotFoundResponse({ description: "Pet not founded" })
  @ApiBadRequestResponse({ description: "Bad request" })
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Pet> {
    return await this.petService.getPet(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ description: "Pet successfully updated", type: Pet })
  @ApiNotFoundResponse({ description: "Pet not founded" })
  @ApiBadRequestResponse({ description: "Bad request" })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updatePetDto: UpdatePetDto
  ): Promise<Pet> {
    return await this.petService.updatePet(id, updatePetDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ description: "Pet successfully deleted", type: Pet })
  @ApiNotFoundResponse({ description: "Pet not founded" })
  @ApiBadRequestResponse({ description: "Bad request" })
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<Pet> {
    return await this.petService.removePet(id);
  }
}
