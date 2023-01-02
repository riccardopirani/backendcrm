import { CreateSpesepreventivoDto } from "./dto/create-spesepreventivo.dto";
import { Repository } from "typeorm";
import { Spesepreventivo } from "./entities/spesepreventivo.entity";
import { UpdateSpesepreventivoDto } from "./dto/update-spesepreventivo.dto";
export declare class SpesepreventivoService {
  private repo;
  constructor(repo: Repository<Spesepreventivo>);
  create(
    createAmministratoreDto: CreateSpesepreventivoDto
  ): Promise<CreateSpesepreventivoDto & Spesepreventivo>;
  findAll(): string;
  loadfrompreventivo(id: number): Promise<Spesepreventivo[]>;
  findOne(id: number): Promise<Spesepreventivo[]>;
  remove(id: number): Promise<import("typeorm").DeleteResult>;
  totale(id: number): Promise<number>;
  update(
    id: number,
    dto: UpdateSpesepreventivoDto
  ): Promise<import("typeorm").UpdateResult>;
}
