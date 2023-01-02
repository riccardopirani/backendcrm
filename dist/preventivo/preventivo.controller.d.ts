import { PreventivoService } from "./preventivo.service";
import { CreatePreventivoDto } from "./dto/create-preventivo.dto";
import { UpdatePreventivoDto } from "./dto/update-preventivo.dto";
import { UtenteService } from "src/utente/utente.service";
import { AttivitaprevService } from "src/attivitaprev/attivitaprev.service";
import { SpesepreventivoService } from "src/spesepreventivo/spesepreventivo.service";
export declare class PreventivoController {
  private readonly service;
  private readonly utenteservice;
  private readonly attivitaservice;
  private readonly spesaservice;
  constructor(
    service: PreventivoService,
    utenteservice: UtenteService,
    attivitaservice: AttivitaprevService,
    spesaservice: SpesepreventivoService
  );
  create(
    createPreventivoDto: CreatePreventivoDto
  ): Promise<
    CreatePreventivoDto & import("./entities/preventivo.entity").Preventivo
  >;
  update(
    id: string,
    updatePreventivoDto: UpdatePreventivoDto
  ): Promise<import("typeorm").UpdateResult>;
  confirm(
    id: number,
    dataaccettazione: Date,
    idUtente: number
  ): Promise<import("typeorm").UpdateResult>;
  findAll(): Promise<import("./entities/preventivo.entity").Preventivo[]>;
  findOne(
    id: string
  ): Promise<import("./entities/preventivo.entity").Preventivo>;
  delete(id: string): Promise<import("typeorm").DeleteResult>;
  searchbyid(
    id: string
  ): Promise<import("./entities/preventivo.entity").Preventivo[]>;
}
