import { ClienteService } from "./cliente.service";
import { CreateClienteDto } from "./dto/create-cliente.dto";
import { UpdateClienteDto } from "./dto/update-cliente.dto";
import { Request } from "express";
export declare class ClienteController {
  private readonly clienteService;
  constructor(clienteService: ClienteService);
  create(
    createClienteDto: CreateClienteDto,
    request: Request
  ): Promise<CreateClienteDto & import("./entities/cliente.entity").Cliente>;
  findAll(
    request: Request
  ): Promise<import("./entities/cliente.entity").Cliente[]>;
  findOne(
    id: string,
    request: Request
  ): Promise<import("./entities/cliente.entity").Cliente>;
  updatecliente(
    id: string,
    updateClienteDto: UpdateClienteDto,
    request: Request
  ): Promise<import("typeorm").UpdateResult>;
  update(
    id: string,
    updateClienteDto: UpdateClienteDto
  ): Promise<import("typeorm").UpdateResult>;
  remove(id: string): string;
  updatestate(
    id: string,
    enable: boolean,
    request: Request
  ): Promise<import("typeorm").UpdateResult>;
}
