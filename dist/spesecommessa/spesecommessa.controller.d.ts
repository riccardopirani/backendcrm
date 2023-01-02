import { SpesecommessaService } from "./spesecommessa.service";
import { CreateSpesecommessaDto } from "./dto/create-spesecommessa.dto";
import { Request } from "express";
import { UpdateSpesecommessaDto } from "./dto/update-spesecommessa.dto";
export declare class SpesecommessaController {
  private readonly spesecommessaService;
  constructor(spesecommessaService: SpesecommessaService);
  create(
    createSpesecommessaDto: CreateSpesecommessaDto,
    request: Request
  ): Promise<
    CreateSpesecommessaDto &
      import("./entities/spesecommessa.entity").Spesecommessa
  >;
  delete(id: String, request: Request): Promise<import("typeorm").DeleteResult>;
  findAll(
    request: Request
  ): Promise<import("./entities/spesecommessa.entity").Spesecommessa[]>;
  total(id: String, request: Request): Promise<number>;
  loadspese(
    id: string,
    request: Request
  ): Promise<import("./entities/spesecommessa.entity").Spesecommessa[]>;
  update(
    id: string,
    updateClienteDto: UpdateSpesecommessaDto,
    request: Request
  ): Promise<import("typeorm").UpdateResult>;
}
