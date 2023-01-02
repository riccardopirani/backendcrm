import { PartialType } from "@nestjs/mapped-types";
import { CreatePreventivoDto } from "./create-preventivo.dto";

export class UpdatePreventivoDto extends PartialType(CreatePreventivoDto) {}
