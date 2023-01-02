import { PartialType } from "@nestjs/mapped-types";
import { CreateAttivitacommessaDto } from "./create-attivitacommessa.dto";

export class UpdateAttivitacommessaDto extends PartialType(
  CreateAttivitacommessaDto
) {}
