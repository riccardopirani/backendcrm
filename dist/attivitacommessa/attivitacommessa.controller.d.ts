import { AttivitacommessaService } from "./attivitacommessa.service";
import { CreateAttivitacommessaDto } from "./dto/create-attivitacommessa.dto";
import { UpdateAttivitacommessaDto } from "./dto/update-attivitacommessa.dto";
export declare class AttivitacommessaController {
  private readonly attivitacommessaService;
  constructor(attivitacommessaService: AttivitacommessaService);
  create(
    createAttivitacommessaDto: CreateAttivitacommessaDto
  ): Promise<
    CreateAttivitacommessaDto &
      import("./entities/attivitacommessa.entity").Attivitacommessa
  >;
  loadfromcommessa(
    id: string
  ): Promise<import("./entities/attivitacommessa.entity").Attivitacommessa[]>;
  delete(id: string): Promise<import("typeorm").DeleteResult>;
  tothour(id: string): Promise<any>;
  reportcommessaore(id: string): Promise<boolean>;
  update(
    id: number,
    updateAttivitacommessaDto: UpdateAttivitacommessaDto
  ): Promise<import("typeorm").UpdateResult>;
}
