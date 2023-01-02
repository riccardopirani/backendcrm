import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsBoolean, IsString, MaxLength, MinLength } from "class-validator";

@Entity()
export class Cliente extends BaseEntity {
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
  indirizzo: string;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  citta: string;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  provincia: string;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  cap: string;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  email: string;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  telefono: string;

  @Column({ default: true })
  @IsBoolean()
  enable: Boolean;

  @Column({ length: 150, nullable: true })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  ragionesociale: string;

  @Column({ length: 150, nullable: true })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  codicefiscale: string;

  @Column({ length: 150, nullable: true })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  partitaiva: string;
}
