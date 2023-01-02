import { BaseEntity } from "typeorm";
export declare class Spesecommessa extends BaseEntity {
  id: number;
  nome: string;
  datacreazione: Date;
  costo: number;
  IdCommessa: number;
  IdUtente: number;
}
