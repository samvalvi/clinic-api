import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { LoginDto, RegisterDto } from "./dto";
import { Admin } from "./entities/admin.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin) private readonly authRepository: Repository<Admin>
  ) {}

  async login(loginDto: LoginDto) {
    const admin = await this.authRepository.findOne({
      where: { email: loginDto.email },
      select: { email: true, password: true, id: true },
    });
  }

  async register(registerDto: RegisterDto) {
    try {
      const new_admin = await this.authRepository.create(registerDto);
      return await this.authRepository.save(new_admin);
    } catch (error) {
      if (error.code === "23505") {
        throw new HttpException("Admin already exist", HttpStatus.CONFLICT);
      }
    }
  }
}
