import { BaseEntity } from "typeorm";
export declare enum UserRole {
  QUOTATOR = "QUOTATOR",
  OPERATOR = "OPERATOR",
  ADMIN = "ADMIN",
  COMMERCIAL = "COMMERCIAL",
  CONTROLLER = "CONTROLLER",
}
export declare class Utente extends BaseEntity {
  id: number;
  nome: string;
  cognome: string;
  username: string;
  password: string;
  telefono: string;
  cellulare: string;
  ruolo: UserRole;
  enable: Boolean;
}
export declare class UtenteLogin extends BaseEntity {
  id: number;
  username: string;
  password: string;
}
