import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";

import { Admin } from "../entities/admin.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    configService: ConfigService
  ) {
    super({
      secretOrKey: configService.get("SECRET_KEY"),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Admin> {
    const { id } = payload;

    const admin = await this.adminRepository.findOne({
      where: { id },
    });

    if (!admin) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }

    // Add to resquest
    return admin;
  }
}
