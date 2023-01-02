import { BaseEntity } from "typeorm";
export declare class Spesepreventivo extends BaseEntity {
  id: number;
  nome: string;
  datacreazione: Date;
  costo: number;
  IdPreventivo: number;
  IdUtente: number;
}
