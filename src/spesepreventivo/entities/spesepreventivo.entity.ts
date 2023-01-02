import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsString, MaxLength, MinLength } from "class-validator";
import { Preventivo } from "../../preventivo/entities/preventivo.entity";
import { Utente } from "src/utente/entities/utente.entity";

@Entity()
export class Spesepreventivo extends BaseEntity {
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
  @OneToOne((type) => Preventivo, (post) => post.id)
  IdPreventivo: number;

  @Column()
  @OneToOne(() => Utente, (user) => user.id)
  IdUtente: number;
}
