import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsBoolean, IsString, MaxLength, MinLength } from "class-validator";

export enum UserRole {
  QUOTATOR = "QUOTATOR",
  OPERATOR = "OPERATOR",
  ADMIN = "ADMIN",
  COMMERCIAL = "COMMERCIAL",
  CONTROLLER = "CONTROLLER",
}

@Entity()
export class Utente extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  nome: string;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  cognome: string;

  @Column({ length: 150, unique: true })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  username: string;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  password: string;

  @Column({ length: 150, nullable: true })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  telefono: string;

  @Column({ length: 150, nullable: true })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  cellulare: string;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  ruolo: UserRole;

  @Column({ default: true })
  @IsBoolean()
  enable: Boolean;
}

//Entity al login
@Entity()
export class UtenteLogin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  username: string;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  password: string;
}
