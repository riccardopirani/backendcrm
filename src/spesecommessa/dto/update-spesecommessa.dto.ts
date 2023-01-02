import { PartialType } from "@nestjs/mapped-types";
import { CreateSpesecommessaDto } from "./create-spesecommessa.dto";

export class UpdateSpesecommessaDto extends PartialType(
  CreateSpesecommessaDto
) {}
