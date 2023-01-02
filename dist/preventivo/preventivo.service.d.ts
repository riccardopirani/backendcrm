import { UserRole } from "src/utente/entities/utente.entity";
import { Repository } from "typeorm";
import { BaseService } from "../base-services/base.service";
import { ConfigService } from "../config/config.service";
import { CreatePreventivoDto } from "./dto/create-preventivo.dto";
import { UpdatePreventivoDto } from "./dto/update-preventivo.dto";
import { Preventivo } from "./entities/preventivo.entity";
export declare class PreventivoService extends BaseService<Preventivo> {
  private repo;
  private configService;
  constructor(repo: Repository<Preventivo>, configService: ConfigService);
  createPreventivo(
    createAmministratoreDto: CreatePreventivoDto
  ): Promise<CreatePreventivoDto & Preventivo>;
  findAll(): Promise<Preventivo[]>;
  findOne(id: number): Promise<Preventivo>;
  updatePreventivo(
    id: number,
    updatePreventivoDto: UpdatePreventivoDto
  ): Promise<import("typeorm").UpdateResult>;
  deletePreventivo(id: number): Promise<import("typeorm").DeleteResult>;
  contapreventiviperdataperutenteprev(
    datacreazione: Date,
    dataaccettazione: Date
  ): Promise<Preventivo[]>;
  contapreventiviperdataperutente(
    idUtente: number,
    datacreazione: Date,
    dataaccettazione: Date
  ): Promise<Preventivo[]>;
  contaperutente(
    idUtente: number,
    isPreventiviVenduti: Boolean,
    datacreazione: Date,
    dataaccettazione: Date
  ): Promise<number>;
  totalevendutoutente(
    idUtente: number,
    datacreazione: Date,
    dataaccettazione: Date
  ): Promise<number>;
  contapreventivisede(
    sede: String,
    datacreazione: Date,
    dataaccettazione: Date
  ): Promise<number>;
  contapreventivisedevendutiglobale(
    datacreazione: Date,
    dataaccettazione: Date
  ): Promise<number>;
  contapreventivisedevendutiinfo(
    sede: String,
    datacreazione: Date,
    dataaccettazione: Date
  ): Promise<Preventivo[]>;
  contapreventivisedevenduti(
    sede: String,
    datacreazione: Date,
    dataaccettazione: Date
  ): Promise<number>;
  contapreventivirage(
    datacreazione: Date,
    dataaccettazione: Date
  ): Promise<number>;
  sommatotalevendutoglobale(
    datacreazione: Date,
    dataaccettazione: Date
  ): Promise<number>;
  sommatotalevenduto(
    sede: String,
    datacreazione: Date,
    dataaccettazione: Date
  ): Promise<number>;
  sommaprezzitotaliglobale(
    datacreazione: Date,
    dataaccettazione: Date
  ): Promise<number>;
  sommaprezzitotali(
    sede: String,
    datacreazione: Date,
    dataaccettazione: Date
  ): Promise<number>;
  totalepreventiviutente(
    idUtente: number,
    datacreazione: Date,
    dataaccettazione: Date
  ): Promise<number>;
  confirm(
    id: number,
    idUtente: number,
    dataaccettazione: Date,
    prezzoscontato: number
  ): Promise<import("typeorm").UpdateResult>;
  searchbyid(role: UserRole, id: number): Promise<Preventivo[]>;
}
