import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsString, MaxLength, MinLength } from "class-validator";
import { Utente } from "src/utente/entities/utente.entity";
import { Preventivo } from "src/preventivo/entities/preventivo.entity";

@Entity()
export class Attivitaprev extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  nome: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  datacreazione: Date;

  @Column()
  ore: string;

  @Column()
  @OneToOne(() => Preventivo, (prev) => prev.id)
  IdPreventivo: number;

  @Column()
  @OneToOne(() => Utente, (user) => user.id)
  IdUtente: number;
}
