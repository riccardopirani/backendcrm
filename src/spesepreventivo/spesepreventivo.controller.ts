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
import { SpesepreventivoService } from "./spesepreventivo.service";
import { CreateSpesepreventivoDto } from "./dto/create-spesepreventivo.dto";
import { Preventivo } from "../preventivo/entities/preventivo.entity";
import { Request } from "express";
import { UpdateSpesepreventivoDto } from "./dto/update-spesepreventivo.dto";

// @ts-ignore
@ApiTags("spesepreventivo")
@Controller("spesepreventivo")
export class SpesepreventivoController {
  constructor(
    private readonly spesepreventivoService: SpesepreventivoService
  ) {}

  @ApiBearerAuthWithTag()
  @Post()
  async create(
    @Body() createSpesepreventivoDto: CreateSpesepreventivoDto,
    @Req() request: Request
  ) {
    return await this.spesepreventivoService.create(createSpesepreventivoDto);
  }

  @ApiBearerAuthWithTag()
  @Post("/id")
  async findOne(@Body() preventivo: Preventivo, @Req() request: Request) {
    return await this.spesepreventivoService.findOne(preventivo.id);
  }

  @ApiBearerAuthWithTag()
  @Delete(":id")
  async delete(@Param("id") id: string, @Req() request: Request) {
    return await this.spesepreventivoService.remove(+id);
  }

  @ApiBearerAuthWithTag()
  @Get("/preventivo/:id")
  async loadfrompreventivo(@Param("id") id: string, @Req() request: Request) {
    return await this.spesepreventivoService.loadfrompreventivo(
      +id.replace(":", "")
    );
  }

  @ApiBearerAuthWithTag()
  @Get("/totcost/:id")
  async total(@Param("id") id: String, @Req() request: Request) {
    return await this.spesepreventivoService.totale(+id.replace(":", ""));
  }

  @ApiBearerAuthWithTag()
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateSpesepreventivoDto,
    @Req() request: Request
  ) {
    return await this.spesepreventivoService.update(+id.replace(":", ""), dto);
  }
}
