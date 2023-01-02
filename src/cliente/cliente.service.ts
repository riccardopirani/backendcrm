import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createQueryBuilder, Repository } from "typeorm";
import { CreateClienteDto } from "./dto/create-cliente.dto";
import { UpdateClienteDto } from "./dto/update-cliente.dto";
import { Cliente } from "./entities/cliente.entity";

@Injectable()
export class ClienteService {
  constructor(@InjectRepository(Cliente) private repo: Repository<Cliente>) {}

  create(createClienteDto: CreateClienteDto) {
    return this.repo.save(createClienteDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: String) {
    return this.repo.findOne(+id);
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return this.repo.update(id, updateClienteDto);
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }

  async updatestate(id: string, enable: boolean) {
    return await createQueryBuilder("cliente")
      .update<Cliente>(Cliente, { enable: enable })
      .where("cliente.id = :id", { id: id })
      .updateEntity(true)
      .execute();
  }
}
