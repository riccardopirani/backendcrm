"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttivitamaterialeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const export_to_csv_1 = require("export-to-csv");
const materialeconsumo_entity_1 = require("../materialeconsumo/entities/materialeconsumo.entity");
const typeorm_2 = require("typeorm");
const attivitamateriale_entity_1 = require("./entities/attivitamateriale.entity");
const moment = require("moment");
const fs = require("fs");
let AttivitamaterialeService = class AttivitamaterialeService {
  constructor(repo, repomateriale) {
    this.repo = repo;
    this.repomateriale = repomateriale;
  }
  create(createAttivitamaterialeDto) {
    return this.repo.save(createAttivitamaterialeDto);
  }
  findAll() {
    return this.repo.find();
  }
  findOne(id) {
    return this.repo.findOne(id);
  }
  findbyIdCommesa(id) {
    return this.repo.find({
      IdCommessa: id,
    });
  }
  update(id, updateAttivitamaterialeDto) {
    return this.repo.update(id, updateAttivitamaterialeDto);
  }
  remove(id) {
    return this.repo.delete(id);
  }
  async report(id) {
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
      const csvExporter = new export_to_csv_1.ExportToCsv(options);
      const report = csvExporter.generateCsv(JSON.stringify(datafull), true);
      fs.writeFileSync("dataprev.csv", report);
      return true;
    } catch (err) {
      console.log("Errore generazione csv: " + err);
      throw err;
    }
  }
};
AttivitamaterialeService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(
      0,
      (0, typeorm_1.InjectRepository)(
        attivitamateriale_entity_1.Attivitamateriale
      )
    ),
    __param(
      1,
      (0, typeorm_1.InjectRepository)(
        materialeconsumo_entity_1.Materialeconsumo
      )
    ),
    __metadata("design:paramtypes", [
      typeorm_2.Repository,
      typeorm_2.Repository,
    ]),
  ],
  AttivitamaterialeService
);
exports.AttivitamaterialeService = AttivitamaterialeService;
//# sourceMappingURL=attivitamateriale.service.js.map
