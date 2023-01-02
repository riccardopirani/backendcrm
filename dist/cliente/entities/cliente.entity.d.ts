import { BaseEntity } from "typeorm";
export declare class Cliente extends BaseEntity {
  id: number;
  nome: string;
  indirizzo: string;
  citta: string;
  provincia: string;
  cap: string;
  email: string;
  telefono: string;
  enable: Boolean;
  ragionesociale: string;
  codicefiscale: string;
  partitaiva: string;
}
