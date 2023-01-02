import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsString, MaxLength, MinLength } from "class-validator";
import { Utente } from "src/utente/entities/utente.entity";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { Preventivo } from "src/preventivo/entities/preventivo.entity";

export enum CommessaRole {
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}

@Entity()
export class Commessa extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  nome: string;

  @Column({
    type: "enum",
    enum: CommessaRole,
  })
  state: CommessaRole;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  sede: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  datacreazione: Date;

  @Column()
  @OneToOne(() => Utente, (user) => user.id)
  IdUtente: number;

  @OneToOne(() => Preventivo, (prev) => prev.id)
  @JoinColumn({ name: "IdPreventivo" })
  preventivo: Preventivo;

  @Column()
  IdPreventivo: number;

  @Column({ type: "timestamp", nullable: true })
  datachiusura: Date;

  @Column()
  @OneToOne(() => Cliente, (c) => c.id)
  IdCliente: number;

  @Column({ type: "timestamp", nullable: true })
  dataconsegna: Date;

  @Column({ type: "simple-array", nullable: true })
  IdOperatori: number[];
}
