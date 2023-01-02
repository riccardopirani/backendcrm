import { Repository } from "typeorm";
import { CreateClienteDto } from "./dto/create-cliente.dto";
import { UpdateClienteDto } from "./dto/update-cliente.dto";
import { Cliente } from "./entities/cliente.entity";
export declare class ClienteService {
  private repo;
  constructor(repo: Repository<Cliente>);
  create(
    createClienteDto: CreateClienteDto
  ): Promise<CreateClienteDto & Cliente>;
  findAll(): Promise<Cliente[]>;
  findOne(id: String): Promise<Cliente>;
  update(
    id: number,
    updateClienteDto: UpdateClienteDto
  ): Promise<import("typeorm").UpdateResult>;
  remove(id: number): string;
  updatestate(
    id: string,
    enable: boolean
  ): Promise<import("typeorm").UpdateResult>;
}
