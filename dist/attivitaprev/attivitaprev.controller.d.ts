import { AttivitaprevService } from "./attivitaprev.service";
import { CreateAttivitaprevDto } from "./dto/create-attivitaprev.dto";
import { UpdateAttivitaprevDto } from "./dto/update-attivitaprev.dto";
import { Request } from "express";
export declare class AttivitaprevController {
  private readonly attivitaprevService;
  constructor(attivitaprevService: AttivitaprevService);
  create(
    createAttivitaprevDto: CreateAttivitaprevDto,
    request: Request
  ): Promise<
    CreateAttivitaprevDto &
      import("./entities/attivitaprev.entity").Attivitaprev
  >;
  findAll(request: Request): Promise<string>;
  findOne(
    id: string,
    request: Request
  ): Promise<import("./entities/attivitaprev.entity").Attivitaprev[]>;
  tothour(id: string, request: Request): Promise<any>;
  update(
    id: string,
    updateAttivitaprevDto: UpdateAttivitaprevDto,
    request: Request
  ): Promise<import("typeorm").UpdateResult>;
  remove(id: string, request: Request): Promise<import("typeorm").DeleteResult>;
  reportcommessaore(id: string, request: Request): Promise<boolean>;
  updateattivita(
    id: string,
    nome: string,
    ore: string,
    request: Request
  ): Promise<import("typeorm").UpdateResult>;
}
