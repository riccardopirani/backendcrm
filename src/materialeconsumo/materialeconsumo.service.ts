import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMaterialeconsumoDto } from "./dto/create-materialeconsumo.dto";
import { UpdateMaterialeconsumoDto } from "./dto/update-materialeconsumo.dto";
import { Materialeconsumo } from "./entities/materialeconsumo.entity";

@Injectable()
export class MaterialeconsumoService {
  constructor(
    @InjectRepository(Materialeconsumo)
    private repo: Repository<Materialeconsumo>
  ) {}

  create(dto: CreateMaterialeconsumoDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }
  remove(id: number) {
    return this.repo.delete(id);
  }
  findOne(id: number) {
    return this.repo.findOne(id);
  }

  update(id: number, updateMaterialeconsumoDto: UpdateMaterialeconsumoDto) {
    return this.repo.update(id, updateMaterialeconsumoDto);
  }
}
