import { MaterialeconsumoService } from "./materialeconsumo.service";
import { CreateMaterialeconsumoDto } from "./dto/create-materialeconsumo.dto";
import { UpdateMaterialeconsumoDto } from "./dto/update-materialeconsumo.dto";
export declare class MaterialeconsumoController {
  private readonly materialeconsumoService;
  constructor(materialeconsumoService: MaterialeconsumoService);
  create(
    createMaterialeconsumoDto: CreateMaterialeconsumoDto
  ): Promise<
    CreateMaterialeconsumoDto &
      import("./entities/materialeconsumo.entity").Materialeconsumo
  >;
  findAll(): Promise<
    import("./entities/materialeconsumo.entity").Materialeconsumo[]
  >;
  findOne(
    id: string
  ): Promise<import("./entities/materialeconsumo.entity").Materialeconsumo>;
  update(
    id: string,
    updateMaterialeconsumoDto: UpdateMaterialeconsumoDto
  ): Promise<import("typeorm").UpdateResult>;
  remove(id: string): Promise<import("typeorm").DeleteResult>;
}
