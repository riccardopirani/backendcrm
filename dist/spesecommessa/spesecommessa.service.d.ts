import { Repository } from "typeorm";
import { CreateSpesecommessaDto } from "./dto/create-spesecommessa.dto";
import { UpdateSpesecommessaDto } from "./dto/update-spesecommessa.dto";
import { Spesecommessa } from "./entities/spesecommessa.entity";
export declare class SpesecommessaService {
  private repo;
  constructor(repo: Repository<Spesecommessa>);
  create(
    dto: CreateSpesecommessaDto
  ): Promise<CreateSpesecommessaDto & Spesecommessa>;
  findAll(): Promise<Spesecommessa[]>;
  remove(id: number): Promise<import("typeorm").DeleteResult>;
  loadbycommessa(id: number): Promise<Spesecommessa[]>;
  totale(id: number): Promise<number>;
  update(
    id: number,
    updateClienteDto: UpdateSpesecommessaDto
  ): Promise<import("typeorm").UpdateResult>;
}
