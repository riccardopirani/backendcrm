import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExportToCsv } from "export-to-csv";
import { Materialeconsumo } from "src/materialeconsumo/entities/materialeconsumo.entity";
import { Repository } from "typeorm";
import { CreateAttivitamaterialeDto } from "./dto/create-attivitamateriale.dto";
import { UpdateAttivitamaterialeDto } from "./dto/update-attivitamateriale.dto";
import { Attivitamateriale } from "./entities/attivitamateriale.entity";
import * as moment from "moment";
const fs = require("fs");

@Injectable()
export class AttivitamaterialeService {
  constructor(
    @InjectRepository(Attivitamateriale)
    private repo: Repository<Attivitamateriale>,
    @InjectRepository(Materialeconsumo)
    private repomateriale: Repository<Materialeconsumo>
  ) {}

  create(createAttivitamaterialeDto: CreateAttivitamaterialeDto) {
    return this.repo.save(createAttivitamaterialeDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  findbyIdCommesa(id: number) {
    return this.repo.find({
      IdCommessa: id,
    });
  }

  update(id: number, updateAttivitamaterialeDto: UpdateAttivitamaterialeDto) {
    return this.repo.update(id, updateAttivitamaterialeDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  //Genero il report csv del materiale
  async report(id: number) {
    try {
      var listamateriale = await this.repo.find({
        where: { IdCommessa: id },
      });
      var datafull = [];

      for (var i = 0; i < listamateriale.length; i++) {
        var materiale = await this.repomateriale.findOne(
          listamateriale[i].IdMateriale
        );
        var obejct = {
          IdCommessa: listamateriale[i].IdCommessa,
          quantita: listamateriale[i].quantita,
          datacreazione: moment(listamateriale[i].datacreazione).format(
            moment.localeData("it").longDateFormat("L")
          ),
          nome: materiale.nome,
          unitamisura: materiale.unitamisura,
        };
        datafull.push(obejct);
      }

      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "Report Materiale",
        useTextFile: true,
        useBom: true,
      };
      const csvExporter = new ExportToCsv(options);
      const report = csvExporter.generateCsv(JSON.stringify(datafull), true);
      fs.writeFileSync("dataprev.csv", report);
      return true;
    } catch (err) {
      console.log("Errore generazione csv: " + err);
      throw err;
    }
  }
}
