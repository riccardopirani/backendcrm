import { SpesepreventivoService } from "./spesepreventivo.service";
import { CreateSpesepreventivoDto } from "./dto/create-spesepreventivo.dto";
import { Preventivo } from "../preventivo/entities/preventivo.entity";
import { Request } from "express";
import { UpdateSpesepreventivoDto } from "./dto/update-spesepreventivo.dto";
export declare class SpesepreventivoController {
  private readonly spesepreventivoService;
  constructor(spesepreventivoService: SpesepreventivoService);
  create(
    createSpesepreventivoDto: CreateSpesepreventivoDto,
    request: Request
  ): Promise<
    CreateSpesepreventivoDto &
      import("./entities/spesepreventivo.entity").Spesepreventivo
  >;
  findOne(
    preventivo: Preventivo,
    request: Request
  ): Promise<import("./entities/spesepreventivo.entity").Spesepreventivo[]>;
  delete(id: string, request: Request): Promise<import("typeorm").DeleteResult>;
  loadfrompreventivo(
    id: string,
    request: Request
  ): Promise<import("./entities/spesepreventivo.entity").Spesepreventivo[]>;
  total(id: String, request: Request): Promise<number>;
  update(
    id: string,
    dto: UpdateSpesepreventivoDto,
    request: Request
  ): Promise<import("typeorm").UpdateResult>;
}
