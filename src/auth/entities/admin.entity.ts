import { genSaltSync, hashSync } from "bcrypt";
import { Exclude } from "class-transformer";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text", {
    unique: true,
  })
  email: string;

  @Exclude()
  @Column("text", {
    select: false,
  })
  password: string;

  @Column("text", {
    default: "admin",
  })
  role: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @BeforeInsert()
  async createHash() {
    const salt = genSaltSync(13);
    this.password = hashSync(this.password, salt);
  }
}
