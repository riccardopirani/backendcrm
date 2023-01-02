import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSpesecommessaDto } from "./dto/create-spesecommessa.dto";
import { UpdateSpesecommessaDto } from "./dto/update-spesecommessa.dto";
import { Spesecommessa } from "./entities/spesecommessa.entity";

@Injectable()
export class SpesecommessaService {
  constructor(
    @InjectRepository(Spesecommessa)
    private repo: Repository<Spesecommessa>
  ) {}

  create(dto: CreateSpesecommessaDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }
  remove(id: number) {
    return this.repo.delete(id);
  }
  async loadbycommessa(id: number) {
    return await this.repo.find({
      where: { IdCommessa: id },
    });
  }

  async totale(id: number) {
    var totale = 0;
    var values = await this.loadbycommessa(id);
    for (var i = 0; i < values.length; i++) {
      totale = totale + values[i].costo;
    }
    return totale;
  }

  update(id: number, updateClienteDto: UpdateSpesecommessaDto) {
    return this.repo.update(id, updateClienteDto);
  }
}
