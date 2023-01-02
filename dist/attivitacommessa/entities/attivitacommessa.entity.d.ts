import { BaseEntity } from "typeorm";
export declare class Attivitacommessa extends BaseEntity {
  id: number;
  nome: string;
  datacreazione: Date;
  ore: string;
  IdCommessa: number;
  IdUtente: number;
}
