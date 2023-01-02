import { PartialType } from "@nestjs/mapped-types";
import { CreateAttivitaprevDto } from "./create-attivitaprev.dto";

export class UpdateAttivitaprevDto extends PartialType(CreateAttivitaprevDto) {}
