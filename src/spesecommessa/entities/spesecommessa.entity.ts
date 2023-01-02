import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsString, MaxLength, MinLength } from "class-validator";
import { Utente } from "src/utente/entities/utente.entity";
import { Commessa } from "src/commessa/entities/commessa.entity";

@Entity()
export class Spesecommessa extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  nome: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  datacreazione: Date;

  @Column({ nullable: false, type: "float" })
  costo: number;

  @Column()
  @OneToOne((type) => Commessa, (commesa) => commesa.id)
  IdCommessa: number;

  @Column({ nullable: true })
  @OneToOne(() => Utente, (user) => user.id)
  IdUtente: number;
}
