import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Commessa } from "src/commessa/entities/commessa.entity";
import { Utente } from "src/utente/entities/utente.entity";
import { Materialeconsumo } from "src/materialeconsumo/entities/materialeconsumo.entity";

@Entity()
export class Attivitamateriale extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Column()
  @OneToOne((type) => Commessa, (commessa) => commessa.id)
  IdCommessa: number;

  @Column({ nullable: true })
  @OneToOne((type) => Utente, (utente) => utente.id)
  IdUtente: number;

  @Column({ nullable: false })
  @OneToOne((type) => Materialeconsumo, (materiale) => materiale.id)
  IdMateriale: number;

  @Column({ nullable: false, type: "float" })
  quantita: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  datacreazione: Date;
}
