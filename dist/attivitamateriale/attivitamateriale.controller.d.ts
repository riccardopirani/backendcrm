import { AttivitamaterialeService } from "./attivitamateriale.service";
import { CreateAttivitamaterialeDto } from "./dto/create-attivitamateriale.dto";
import { UpdateAttivitamaterialeDto } from "./dto/update-attivitamateriale.dto";
export declare class AttivitamaterialeController {
  private readonly service;
  constructor(service: AttivitamaterialeService);
  create(
    createAttivitamaterialeDto: CreateAttivitamaterialeDto
  ): Promise<
    CreateAttivitamaterialeDto &
      import("./entities/attivitamateriale.entity").Attivitamateriale
  >;
  report(id: string): Promise<boolean>;
  findAll(): Promise<
    import("./entities/attivitamateriale.entity").Attivitamateriale[]
  >;
  findOne(
    id: string
  ): Promise<import("./entities/attivitamateriale.entity").Attivitamateriale[]>;
  idcommessa(
    id: string
  ): Promise<import("./entities/attivitamateriale.entity").Attivitamateriale[]>;
  update(
    id: string,
    updateAttivitamaterialeDto: UpdateAttivitamaterialeDto
  ): Promise<import("typeorm").UpdateResult>;
  remove(id: string): Promise<import("typeorm").DeleteResult>;
}
