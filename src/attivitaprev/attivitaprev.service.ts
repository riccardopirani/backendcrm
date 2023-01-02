import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExportToCsv } from "export-to-csv";
import { getRepository, Repository } from "typeorm";
import { CreateAttivitaprevDto } from "./dto/create-attivitaprev.dto";
import { UpdateAttivitaprevDto } from "./dto/update-attivitaprev.dto";
import { Attivitaprev } from "./entities/attivitaprev.entity";
const fs = require("fs");

@Injectable()
export class AttivitaprevService {
  constructor(
    @InjectRepository(Attivitaprev) private repo: Repository<Attivitaprev>
  ) {}

  create(dto: CreateAttivitaprevDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return `This action returns all attivitaprev`;
  }

  async findOne(id: number) {
    return await this.repo.find({
      where: { IdPreventivo: id },
    });
  }

  async getTotaleAttivitaPreviste(IdPreventivo: number) {
    var values = await this.loadfrompreventivo(IdPreventivo);
    if (values.length > 0) {
      const sum = values
        .filter((item) => item.ore)
        .reduce((sum, current) => sum + parseFloat(current.ore), 0);
      return sum;
    } else {
      return 0;
    }
  }

  sumofhour = (data) => {
    const sum = data.reduce((acc, curr) => {
      let [h1, m1] = curr.ore.split(":");
      acc += +h1 + +m1 / 60;
      return acc;
    }, 0);
    return sum;
  };

  async totaleore(id: number) {
    var values = await this.repo.find({
      where: { IdPreventivo: id },
    });
    return this.sumofhour(values);
  }

  update(id: number, updateAttivitaprevDto: UpdateAttivitaprevDto) {
    return this.repo.update(+id, updateAttivitaprevDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  async loadfrompreventivo(id: number) {
    return await this.repo.find({
      where: { IdPreventivo: id },
    });
  }

  async updateprev(id: number, nome: string, ore: string) {
    return await getRepository(Attivitaprev)
      .createQueryBuilder("attivitaprev")
      .update<Attivitaprev>(Attivitaprev, { nome: nome })
      .update<Attivitaprev>(Attivitaprev, { ore: ore })
      .where("attivitaprev.id = :id", { id: id })
      .updateEntity(true)
      .execute();
  }

  async reportpreventivo(id: number) {
    try {
      var data = await this.loadfrompreventivo(id);
      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "Report Attivita Preventivo",
        useTextFile: false,
        useBom: true,
      };
      const csvExporter = new ExportToCsv(options);
      const report = csvExporter.generateCsv(JSON.stringify(data), true);
      fs.writeFileSync("dataprev.csv", report);
      return true;
    } catch (err) {
      console.log("Errore generazione csv: " + err);
      return false;
    }
  }
}
