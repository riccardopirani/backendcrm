import { Repository } from "typeorm";
import { CreateAttivitacommessaDto } from "./dto/create-attivitacommessa.dto";
import { UpdateAttivitacommessaDto } from "./dto/update-attivitacommessa.dto";
import { Attivitacommessa } from "./entities/attivitacommessa.entity";
export declare class AttivitacommessaService {
  private repo;
  constructor(repo: Repository<Attivitacommessa>);
  create(
    dto: CreateAttivitacommessaDto
  ): Promise<CreateAttivitacommessaDto & Attivitacommessa>;
  loadfromcommessa(id: number): Promise<Attivitacommessa[]>;
  sumofhour: (data: any) => any;
  totaleore(id: number): Promise<any>;
  getTotaleAttivitaPreviste(IdComessa: number): Promise<number>;
  reportcommessaore(id: number): Promise<boolean>;
  findAll(): string;
  findOne(id: number): string;
  update(
    id: number,
    updateAttivitacommessaDto: UpdateAttivitacommessaDto
  ): Promise<import("typeorm").UpdateResult>;
  remove(id: number): Promise<import("typeorm").DeleteResult>;
}
