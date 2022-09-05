import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Pet } from "../../pet/entities/pet.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text", {
    unique: true,
  })
  email: string;

  @Column("text")
  phone: string;

  @Exclude()
  @Column("text", {
    default: "user",
  })
  role: string;

  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Pet[];

  @Exclude()
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
