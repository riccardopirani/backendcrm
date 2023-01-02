import { BaseEntity } from "typeorm";
export declare class Attivitamateriale extends BaseEntity {
  id: number;
  IdCommessa: number;
  IdUtente: number;
  IdMateriale: number;
  quantita: number;
  datacreazione: Date;
}
