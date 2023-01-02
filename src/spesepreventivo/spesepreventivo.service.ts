import { Injectable } from "@nestjs/common";
import { CreateSpesepreventivoDto } from "./dto/create-spesepreventivo.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Spesepreventivo } from "./entities/spesepreventivo.entity";
import { UpdateSpesepreventivoDto } from "./dto/update-spesepreventivo.dto";

@Injectable()
export class SpesepreventivoService {
  constructor(
    @InjectRepository(Spesepreventivo)
    private repo: Repository<Spesepreventivo>
  ) {}

  create(createAmministratoreDto: CreateSpesepreventivoDto) {
    return this.repo.save(createAmministratoreDto);
  }

  findAll() {
    return `This action returns all spesepreventivo`;
  }

  async loadfrompreventivo(id: number) {
    return await this.repo.find({
      where: { IdPreventivo: id },
    });
  }

  async findOne(id: number) {
    return await this.repo.find({
      where: { IdPreventivo: id },
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  async totale(id: number) {
    var totale = 0;
    var values = await this.loadfrompreventivo(id);
    for (var i = 0; i < values.length; i++) {
      totale = totale + values[i].costo;
    }
    return totale;
  }

  update(id: number, dto: UpdateSpesepreventivoDto) {
    return this.repo.update(id, dto);
  }
}
