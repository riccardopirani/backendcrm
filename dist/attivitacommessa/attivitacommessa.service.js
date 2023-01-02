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
exports.AttivitacommessaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attivitacommessa_entity_1 = require("./entities/attivitacommessa.entity");
const export_to_csv_1 = require("export-to-csv");
const fs = require("fs");
let AttivitacommessaService = class AttivitacommessaService {
  constructor(repo) {
    this.repo = repo;
    this.sumofhour = (data) => {
      const sum = data.reduce((acc, curr) => {
        let [h1, m1] = curr.ore.split(":");
        acc += +h1 + +m1 / 60;
        return acc;
      }, 0);
      return sum;
    };
  }
  create(dto) {
    return this.repo.save(dto);
  }
  async loadfromcommessa(id) {
    return await this.repo.find({
      where: { IdCommessa: id },
    });
  }
  async totaleore(id) {
    var values = await this.repo.find({
      where: { IdCommessa: id },
    });
    return this.sumofhour(values);
  }
  async getTotaleAttivitaPreviste(IdComessa) {
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
  async reportcommessaore(id) {
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
      const csvExporter = new export_to_csv_1.ExportToCsv(options);
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
  findOne(id) {
    return `This action returns a #${id} attivitacommessa`;
  }
  update(id, updateAttivitacommessaDto) {
    return this.repo.update(+id, updateAttivitacommessaDto);
  }
  remove(id) {
    return this.repo.delete(id);
  }
};
AttivitacommessaService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(
      0,
      (0, typeorm_1.InjectRepository)(
        attivitacommessa_entity_1.Attivitacommessa
      )
    ),
    __metadata("design:paramtypes", [typeorm_2.Repository]),
  ],
  AttivitacommessaService
);
exports.AttivitacommessaService = AttivitacommessaService;
//# sourceMappingURL=attivitacommessa.service.js.map
