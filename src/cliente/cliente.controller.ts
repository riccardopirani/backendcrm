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
import { ClienteService } from "./cliente.service";
import { CreateClienteDto } from "./dto/create-cliente.dto";
import { UpdateClienteDto } from "./dto/update-cliente.dto";
import { Request } from "express";

@ApiTags("cliente")
@Controller("cliente")
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @ApiBearerAuthWithTag()
  @Post()
  async create(
    @Body() createClienteDto: CreateClienteDto,
    @Req() request: Request
  ) {
    return await this.clienteService.create(createClienteDto);
  }

  @ApiBearerAuthWithTag()
  @Get()
  async findAll(@Req() request: Request) {
    return await this.clienteService.findAll();
  }

  @ApiBearerAuthWithTag()
  @Get("/:id")
  async findOne(@Param("id") id: string, @Req() request: Request) {
    return await this.clienteService.findOne(id);
  }

  @ApiBearerAuthWithTag()
  @Post("/update:id")
  async updatecliente(
    @Param("id") id: string,
    @Body() updateClienteDto: UpdateClienteDto,
    @Req() request: Request
  ) {
    return await this.clienteService.update(
      +id.replace(":", ""),
      updateClienteDto
    );
  }

  @ApiBearerAuthWithTag()
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateClienteDto: UpdateClienteDto
  ) {
    return await this.clienteService.update(
      +id.replace(":", ""),
      updateClienteDto
    );
  }

  @ApiBearerAuthWithTag()
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.clienteService.remove(+id);
  }

  @ApiBearerAuthWithTag()
  @Post("/updatestate")
  async updatestate(
    @Body("id") id: string,
    @Body("enable") enable: boolean,
    @Req() request: Request
  ) {
    return await this.clienteService.updatestate(id, enable);
  }
}
