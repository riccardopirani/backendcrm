import { Materialeconsumo } from "src/materialeconsumo/entities/materialeconsumo.entity";
import { Repository } from "typeorm";
import { CreateAttivitamaterialeDto } from "./dto/create-attivitamateriale.dto";
import { UpdateAttivitamaterialeDto } from "./dto/update-attivitamateriale.dto";
import { Attivitamateriale } from "./entities/attivitamateriale.entity";
export declare class AttivitamaterialeService {
  private repo;
  private repomateriale;
  constructor(
    repo: Repository<Attivitamateriale>,
    repomateriale: Repository<Materialeconsumo>
  );
  create(
    createAttivitamaterialeDto: CreateAttivitamaterialeDto
  ): Promise<CreateAttivitamaterialeDto & Attivitamateriale>;
  findAll(): Promise<Attivitamateriale[]>;
  findOne(id: number): Promise<Attivitamateriale>;
  findbyIdCommesa(id: number): Promise<Attivitamateriale[]>;
  update(
    id: number,
    updateAttivitamaterialeDto: UpdateAttivitamaterialeDto
  ): Promise<import("typeorm").UpdateResult>;
  remove(id: number): Promise<import("typeorm").DeleteResult>;
  report(id: number): Promise<boolean>;
}
