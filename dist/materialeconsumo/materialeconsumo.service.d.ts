import { Repository } from "typeorm";
import { CreateMaterialeconsumoDto } from "./dto/create-materialeconsumo.dto";
import { UpdateMaterialeconsumoDto } from "./dto/update-materialeconsumo.dto";
import { Materialeconsumo } from "./entities/materialeconsumo.entity";
export declare class MaterialeconsumoService {
  private repo;
  constructor(repo: Repository<Materialeconsumo>);
  create(
    dto: CreateMaterialeconsumoDto
  ): Promise<CreateMaterialeconsumoDto & Materialeconsumo>;
  findAll(): Promise<Materialeconsumo[]>;
  remove(id: number): Promise<import("typeorm").DeleteResult>;
  findOne(id: number): Promise<Materialeconsumo>;
  update(
    id: number,
    updateMaterialeconsumoDto: UpdateMaterialeconsumoDto
  ): Promise<import("typeorm").UpdateResult>;
}
