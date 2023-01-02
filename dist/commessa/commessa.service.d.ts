import { BaseService } from "../base-services/base.service";
import { ConfigService } from "../config/config.service";
import { CreateCommessaDto } from "./dto/create-commessa.dto";
import { Repository } from "typeorm";
import { Commessa, CommessaRole } from "./entities/commessa.entity";
import { UpdateCommessaDto } from "./dto/update-commessa.dto";
export declare class CommessaService extends BaseService<Commessa> {
  private repo;
  private configService;
  constructor(repo: Repository<Commessa>, configService: ConfigService);
  createCommessa(dto: CreateCommessaDto): Promise<CreateCommessaDto & Commessa>;
  findAll(): Promise<Commessa[]>;
  findByRagioneSociale(ragioneSociale: String): Promise<Commessa[]>;
  findOne(id: number): Promise<Commessa>;
  findbyState(state: CommessaRole, idOperatore: number): Promise<any[]>;
  updateCommessa(
    id: string,
    updateCommessaDto: UpdateCommessaDto
  ): Promise<import("typeorm").UpdateResult>;
  loadbyIdPreventivo(IdPreventivo: any): Promise<Commessa[]>;
  updateidoperatore(
    id: any,
    arrayvalue: any
  ): Promise<import("typeorm").UpdateResult>;
  loadfromcommessa(id: any, dataInzio: any, dataFine: any): Promise<Commessa[]>;
  report(id: number, start: string, end: string): Promise<boolean>;
}
