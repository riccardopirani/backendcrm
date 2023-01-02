import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiBearerAuthWithTag } from "../utils/swagger/swagger.decorator";
import { SpesecommessaService } from "./spesecommessa.service";
import { CreateSpesecommessaDto } from "./dto/create-spesecommessa.dto";
import { Request } from "express";
import { UpdateSpesecommessaDto } from "./dto/update-spesecommessa.dto";

@ApiTags("spesecommessa")
@Controller("spesecommessa")
export class SpesecommessaController {
  constructor(private readonly spesecommessaService: SpesecommessaService) {}

  @ApiBearerAuthWithTag()
  @Post()
  async create(
    @Body() createSpesecommessaDto: CreateSpesecommessaDto,
    @Req() request: Request
  ) {
    return await this.spesecommessaService.create(createSpesecommessaDto);
  }

  @ApiBearerAuthWithTag()
  @Delete(":id")
  async delete(@Param("id") id: String, @Req() request: Request) {
    return await this.spesecommessaService.remove(+id.replace(":", ""));
  }

  @ApiBearerAuthWithTag()
  @Get()
  async findAll(@Req() request: Request) {
    return await this.spesecommessaService.findAll();
  }

  @ApiBearerAuthWithTag()
  @Get("/totcost/:id")
  async total(@Param("id") id: String, @Req() request: Request) {
    return await this.spesecommessaService.totale(+id.replace(":", ""));
  }

  @ApiBearerAuthWithTag()
  @Get("/commessa/:id")
  async loadspese(@Param("id") id: string, @Req() request: Request) {
    return await this.spesecommessaService.loadbycommessa(+id.replace(":", ""));
  }

  @ApiBearerAuthWithTag()
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateClienteDto: UpdateSpesecommessaDto,
    @Req() request: Request
  ) {
    return await this.spesecommessaService.update(
      +id.replace(":", ""),
      updateClienteDto
    );
  }
}
