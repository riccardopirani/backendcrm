import { Repository } from "typeorm";
import { CreateAttivitaprevDto } from "./dto/create-attivitaprev.dto";
import { UpdateAttivitaprevDto } from "./dto/update-attivitaprev.dto";
import { Attivitaprev } from "./entities/attivitaprev.entity";
export declare class AttivitaprevService {
  private repo;
  constructor(repo: Repository<Attivitaprev>);
  create(
    dto: CreateAttivitaprevDto
  ): Promise<CreateAttivitaprevDto & Attivitaprev>;
  findAll(): string;
  findOne(id: number): Promise<Attivitaprev[]>;
  getTotaleAttivitaPreviste(IdPreventivo: number): Promise<number>;
  sumofhour: (data: any) => any;
  totaleore(id: number): Promise<any>;
  update(
    id: number,
    updateAttivitaprevDto: UpdateAttivitaprevDto
  ): Promise<import("typeorm").UpdateResult>;
  remove(id: number): Promise<import("typeorm").DeleteResult>;
  loadfrompreventivo(id: number): Promise<Attivitaprev[]>;
  updateprev(
    id: number,
    nome: string,
    ore: string
  ): Promise<import("typeorm").UpdateResult>;
  reportpreventivo(id: number): Promise<boolean>;
}
