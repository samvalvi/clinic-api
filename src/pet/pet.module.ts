import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PetService } from "./pet.service";
import { PetController } from "./pet.controller";
import { Pet } from "./entities/pet.entity";
import { User } from "../user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Pet, User])],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
