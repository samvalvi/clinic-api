import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Injectable,
  UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePetDto, UpdatePetDto } from './dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetService {
  constructor(@InjectRepository(Pet) private readonly petRepository: Repository<Pet>) {}

  async createPet(createPetDto: CreatePetDto) {
    const { user, name, breed, age, color  } = createPetDto;
    try {
      const pet = await this.petRepository.create({ user, name, breed, age, color });
      return await this.petRepository.save(pet);
    } catch (error) {
      if( error.code === '23505' ) {
        throw new HttpException('Pet already exist', HttpStatus.CONFLICT);
      }
    }
  }

  async getAllPets() {
    const pets = await this.petRepository.find({ relations: ['user'] });
    if( !pets ) {
      throw new HttpException('Data not founded', HttpStatus.NO_CONTENT);
    }
    return pets;
  }

  async getPet(id: string) {
    const pet = await this.petRepository.findOne({ where: { id: id }, relations: ['user']});
    if( !pet ) {
      throw new HttpException('Pet not founded', HttpStatus.NOT_FOUND);
    }
    return pet;
  }

  async updatePet(id: string, updatePetDto: UpdatePetDto) {
    const pet = await this.petRepository.preload({ id: id, ...updatePetDto })
    if( !pet ) {
      throw new HttpException('Pet not founded', HttpStatus.NOT_FOUND);
    }
    return await this.petRepository.save(pet);
  }

  async removePet(id: string) {
    const pet = await this.petRepository.findOneBy({ id: id })
    if( !pet ) {
      throw new HttpException('Pet not founded', HttpStatus.NOT_FOUND);
    }
    return await this.petRepository.remove(pet);
  }
}
