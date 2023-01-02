import { PartialType } from "@nestjs/mapped-types";
import { CreateSpesepreventivoDto } from "./create-spesepreventivo.dto";

export class UpdateSpesepreventivoDto extends PartialType(
  CreateSpesepreventivoDto
) {}
