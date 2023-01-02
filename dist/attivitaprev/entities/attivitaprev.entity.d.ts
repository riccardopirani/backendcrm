import { BaseEntity } from "typeorm";
export declare class Attivitaprev extends BaseEntity {
  id: number;
  nome: string;
  datacreazione: Date;
  ore: string;
  IdPreventivo: number;
  IdUtente: number;
}
