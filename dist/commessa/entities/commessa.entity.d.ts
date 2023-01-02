import { BaseEntity } from "typeorm";
import { Preventivo } from "src/preventivo/entities/preventivo.entity";
export declare enum CommessaRole {
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}
export declare class Commessa extends BaseEntity {
  id: number;
  nome: string;
  state: CommessaRole;
  sede: string;
  datacreazione: Date;
  IdUtente: number;
  preventivo: Preventivo;
  IdPreventivo: number;
  datachiusura: Date;
  IdCliente: number;
  dataconsegna: Date;
  IdOperatori: number[];
}
