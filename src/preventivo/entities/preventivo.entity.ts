import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsString, MaxLength, MinLength } from "class-validator";
import { Utente } from "src/utente/entities/utente.entity";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { Media } from "../../media/entities/media.entity";

export enum PreventivoRole {
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
  DISCARDED = "DISCARDED",
}

export enum Location {
  BERGAMO = "BERGAMO",
  CISERANO = "CISERANO",
  LALLIO = "LALLIO",
  MILANO = "MILANO",
}

@Entity()
export class Preventivo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  nome: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  datacreazione: Date;

  @Column({
    type: "enum",
    enum: PreventivoRole,
  })
  stato: PreventivoRole;

  @Column({
    type: "enum",
    enum: Location,
  })
  sede: Location;

  @Column()
  @OneToOne(() => Cliente, (c) => c.id)
  IdCliente: number;

  @Column()
  @OneToOne(() => Utente, (user) => user.id)
  IdUtente: number;

  @Column({ nullable: true })
  @OneToOne(() => Utente, (user) => user.id)
  IdVenditore: number;

  @Column({ type: "timestamp", nullable: true })
  dataaccettazione: Date;

  @Column({ type: "timestamp", nullable: true })
  dataconsegna: Date;

  @Column({ nullable: true, type: "float" })
  prezzoscontato: number;

  @Column({ nullable: true, type: "float" })
  prezzototale: number;

  @OneToMany((type) => Media, (media) => media.preventivo)
  gallery: Media[];

  @Column({ nullable: true, type: "float" })
  spesepreviste: number;

  @Column({ nullable: true, type: "float" })
  costomateriale: number;

  @Column({ nullable: true })
  @IsString()
  note: string;
}
