import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiBearerAuthWithTag } from "../utils/swagger/swagger.decorator";
import { AttivitaprevService } from "./attivitaprev.service";
import { CreateAttivitaprevDto } from "./dto/create-attivitaprev.dto";
import { UpdateAttivitaprevDto } from "./dto/update-attivitaprev.dto";
import { Request } from "express";

@ApiTags("attivitapreventivo")
@Controller("attivitapreventivo")
export class AttivitaprevController {
  constructor(private readonly attivitaprevService: AttivitaprevService) {}

  @ApiBearerAuthWithTag()
  @Post()
  async create(
    @Body() createAttivitaprevDto: CreateAttivitaprevDto,
    @Req() request: Request
  ) {
    return await this.attivitaprevService.create(createAttivitaprevDto);
  }

  @ApiBearerAuthWithTag()
  @Get()
  async findAll(@Req() request: Request) {
    return this.attivitaprevService.findAll();
  }

  @ApiBearerAuthWithTag()
  @Get("/preventivo/:id")
  async findOne(@Param("id") id: string, @Req() request: Request) {
    return await this.attivitaprevService.findOne(+id.replace(":", ""));
  }

  @ApiBearerAuthWithTag()
  @Get("/tothour/:id")
  async tothour(@Param("id") id: string, @Req() request: Request) {
    return await this.attivitaprevService.totaleore(+id.replace(":", ""));
  }

  @ApiBearerAuthWithTag()
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateAttivitaprevDto: UpdateAttivitaprevDto,
    @Req() request: Request
  ) {
    return this.attivitaprevService.update(+id, updateAttivitaprevDto);
  }

  @ApiBearerAuthWithTag()
  @Delete(":id")
  async remove(@Param("id") id: string, @Req() request: Request) {
    return this.attivitaprevService.remove(+id.replace(":", ""));
  }

  @ApiBearerAuthWithTag()
  @Post("/report:id")
  async reportcommessaore(@Param("id") id: string, @Req() request: Request) {
    return await this.attivitaprevService.reportpreventivo(
      +id.replace(":", "")
    );
  }

  @ApiBearerAuthWithTag()
  @Post("/update:id")
  async updateattivita(
    @Param("id") id: string,
    @Body() nome: string,
    @Body() ore: string,
    @Req() request: Request
  ) {
    return await this.attivitaprevService.updateprev(
      +id.replace(":", ""),
      nome,
      ore
    );
  }
}
