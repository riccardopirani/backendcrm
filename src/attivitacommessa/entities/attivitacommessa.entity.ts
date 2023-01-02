import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsString, MaxLength, MinLength } from "class-validator";
import { Commessa } from "src/commessa/entities/commessa.entity";
import { Utente } from "src/utente/entities/utente.entity";

@Entity()
export class Attivitacommessa extends BaseEntity {
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
  @OneToOne(() => Commessa, (commessa) => commessa.id)
  IdCommessa: number;

  @Column()
  @OneToOne(() => Utente, (user) => user.id)
  IdUtente: number;
}
