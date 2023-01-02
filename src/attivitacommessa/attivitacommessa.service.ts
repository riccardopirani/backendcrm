import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAttivitacommessaDto } from "./dto/create-attivitacommessa.dto";
import { UpdateAttivitacommessaDto } from "./dto/update-attivitacommessa.dto";
import { Attivitacommessa } from "./entities/attivitacommessa.entity";
import { ExportToCsv } from "export-to-csv";
const fs = require("fs");
@Injectable()
export class AttivitacommessaService {
  constructor(
    @InjectRepository(Attivitacommessa)
    private repo: Repository<Attivitacommessa>
  ) {}

  create(dto: CreateAttivitacommessaDto) {
    return this.repo.save(dto);
  }

  async loadfromcommessa(id: number) {
    return await this.repo.find({
      where: { IdCommessa: id },
    });
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
      where: { IdCommessa: id },
    });
    return this.sumofhour(values);
  }

  async getTotaleAttivitaPreviste(IdComessa: number) {
    var values = await this.loadfromcommessa(IdComessa);
    if (values.length > 0) {
      const sum = values
        .filter((item) => item.ore)
        .reduce((sum, current) => sum + parseFloat(current.ore), 0);
      return sum;
    } else {
      return 0;
    }
  }

  async reportcommessaore(id: number) {
    try {
      var data = await this.loadfromcommessa(id);
      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "Report Commessa",
        useTextFile: false,
        useBom: true,
      };
      const csvExporter = new ExportToCsv(options);
      const report = csvExporter.generateCsv(JSON.stringify(data), true);
      fs.writeFileSync("data.csv", report);
      return true;
    } catch (err) {
      console.log("Errore generazione csv: " + err);
      return false;
    }
  }

  findAll() {
    return `This action returns all attivitacommessa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attivitacommessa`;
  }

  update(id: number, updateAttivitacommessaDto: UpdateAttivitacommessaDto) {
    return this.repo.update(+id, updateAttivitacommessaDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
