import { BaseEntity } from "typeorm";
import { Media } from "../../media/entities/media.entity";
export declare enum PreventivoRole {
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
  DISCARDED = "DISCARDED",
}
export declare enum Location {
  BERGAMO = "BERGAMO",
  CISERANO = "CISERANO",
  LALLIO = "LALLIO",
  MILANO = "MILANO",
}
export declare class Preventivo extends BaseEntity {
  id: number;
  nome: string;
  datacreazione: Date;
  stato: PreventivoRole;
  sede: Location;
  IdCliente: number;
  IdUtente: number;
  IdVenditore: number;
  dataaccettazione: Date;
  dataconsegna: Date;
  prezzoscontato: number;
  prezzototale: number;
  gallery: Media[];
  spesepreviste: number;
  costomateriale: number;
  note: string;
}
