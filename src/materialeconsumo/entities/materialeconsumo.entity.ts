import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsBoolean, IsString, MaxLength, MinLength } from "class-validator";

@Entity()
export class Materialeconsumo extends BaseEntity {
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
  unitamisura: string;

  @Column({ default: true })
  @IsBoolean()
  enable: Boolean;
}
