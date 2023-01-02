import { PartialType } from "@nestjs/swagger";
import { CreateMaterialeconsumoDto } from "./create-materialeconsumo.dto";

export class UpdateMaterialeconsumoDto extends PartialType(
  CreateMaterialeconsumoDto
) {}
