import { Get, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compareSync } from "bcrypt";
import { Repository } from "typeorm";

import { LoginDto, RegisterAdminDto } from "./dto";
import { Admin } from "./entities/admin.entity";
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin) private readonly authRepository: Repository<Admin>,
    private readonly jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const admin = await this.authRepository.findOne({
      where: { email: email },
      select: { email: true, password: true, id: true },
    });

    if (!compareSync(password, admin.password)) {
      throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST);
    }

    //Create JWT
    return {
      ...admin,
      token: this.getJwt({ id: admin.id }),
    };
  }

  async register(registerAdminDto: RegisterAdminDto) {
    try {
      const new_admin = this.authRepository.create(registerAdminDto);
      return await this.authRepository.save(new_admin);
    } catch (error) {
      if (error.code === "23505") {
        throw new HttpException("Admin already exist", HttpStatus.CONFLICT);
      }
    }
  }

  async getAdmins(): Promise<Admin[]> {
    return await this.authRepository.find();
  }

  private getJwt(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
