import { CreateCommessaDto } from "./dto/create-commessa.dto";
import { CommessaService } from "./commessa.service";
import { UpdateCommessaDto } from "./dto/update-commessa.dto";
import { UtenteService } from "src/utente/utente.service";
import { Request } from "express";
import { SpesecommessaService } from "src/spesecommessa/spesecommessa.service";
import { AttivitacommessaService } from "src/attivitacommessa/attivitacommessa.service";
export declare class CommessaController {
  private readonly service;
  private readonly serviceutente;
  private readonly servicespese;
  private readonly serviceattivita;
  constructor(
    service: CommessaService,
    serviceutente: UtenteService,
    servicespese: SpesecommessaService,
    serviceattivita: AttivitacommessaService
  );
  create(
    dto: CreateCommessaDto
  ): Promise<CreateCommessaDto & import("./entities/commessa.entity").Commessa>;
  delete(
    nome: string
  ): Promise<import("./entities/commessa.entity").Commessa[]>;
  search(id: string): Promise<any>;
  findOne(
    id: string,
    request: Request
  ): Promise<import("./entities/commessa.entity").Commessa>;
  updateoperatori(
    id: string,
    arrayvalue: number[]
  ): Promise<import("typeorm").UpdateResult>;
  update(
    id: string,
    updateCommessaDto: UpdateCommessaDto
  ): Promise<import("typeorm").UpdateResult>;
  report(id: string, start: string, end: string): Promise<boolean>;
  reportjson(
    id: string,
    start: string,
    end: string
  ): Promise<import("./entities/commessa.entity").Commessa[]>;
  reportjsonfull(id: string): Promise<any>;
}
