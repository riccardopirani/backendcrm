import { Repository } from "typeorm";
import { UpdateUtenteDto } from "./dto/update-utente.dto";
import { Utente, UtenteLogin } from "./entities/utente.entity";
export declare function encrypt(text: any): string;
export declare function decrypt(text: any): string;
export declare class UtenteService {
  private repo;
  constructor(repo: Repository<Utente>);
  create(dto: Utente): Promise<Utente>;
  Login(dto: UtenteLogin): Promise<Utente>;
  findAll(): Promise<Utente[]>;
  findOne(id: number): Promise<Utente>;
  update(
    id: number,
    updateUtenteDto: UpdateUtenteDto
  ): Promise<import("typeorm").UpdateResult>;
  remove(id: number): string;
  updapassword(
    id: string,
    password: string
  ): Promise<import("typeorm").UpdateResult>;
  updatestate(
    id: string,
    enable: boolean
  ): Promise<import("typeorm").UpdateResult>;
}
