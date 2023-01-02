import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiBearerAuthWithTag } from "../utils/swagger/swagger.decorator";
import { AttivitacommessaService } from "./attivitacommessa.service";
import { CreateAttivitacommessaDto } from "./dto/create-attivitacommessa.dto";
import { UpdateAttivitacommessaDto } from "./dto/update-attivitacommessa.dto";

@ApiTags("attivitacommessa")
@Controller("attivitacommessa")
export class AttivitacommessaController {
  constructor(
    private readonly attivitacommessaService: AttivitacommessaService
  ) {}

  @ApiBearerAuthWithTag()
  @Post()
  async create(@Body() createAttivitacommessaDto: CreateAttivitacommessaDto) {
    return await this.attivitacommessaService.create(createAttivitacommessaDto);
  }

  @ApiBearerAuthWithTag()
  @Get("/commessa/:id")
  async loadfromcommessa(@Param("id") id: string) {
    return await this.attivitacommessaService.loadfromcommessa(
      +id.replace(":", "")
    );
  }

  @ApiBearerAuthWithTag()
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.attivitacommessaService.remove(+id.replace(":", ""));
  }

  @ApiBearerAuthWithTag()
  @Get("/tothour/:id")
  async tothour(@Param("id") id: string) {
    return await this.attivitacommessaService.totaleore(+id.replace(":", ""));
  }

  @ApiBearerAuthWithTag()
  @Post("/report:id")
  async reportcommessaore(@Param("id") id: string) {
    return await this.attivitacommessaService.reportcommessaore(
      +id.replace(":", "")
    );
  }

  @ApiBearerAuthWithTag()
  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateAttivitacommessaDto: UpdateAttivitacommessaDto
  ) {
    return await this.attivitacommessaService.update(
      +id,
      updateAttivitacommessaDto
    );
  }
}
