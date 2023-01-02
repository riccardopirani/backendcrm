import { PartialType } from "@nestjs/swagger";
import { CreateAttivitamaterialeDto } from "./create-attivitamateriale.dto";

export class UpdateAttivitamaterialeDto extends PartialType(
  CreateAttivitamaterialeDto
) {}
