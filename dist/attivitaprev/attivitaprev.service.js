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
exports.AttivitaprevService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const export_to_csv_1 = require("export-to-csv");
const typeorm_2 = require("typeorm");
const attivitaprev_entity_1 = require("./entities/attivitaprev.entity");
const fs = require("fs");
let AttivitaprevService = class AttivitaprevService {
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
  findAll() {
    return `This action returns all attivitaprev`;
  }
  async findOne(id) {
    return await this.repo.find({
      where: { IdPreventivo: id },
    });
  }
  async getTotaleAttivitaPreviste(IdPreventivo) {
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
  async totaleore(id) {
    var values = await this.repo.find({
      where: { IdPreventivo: id },
    });
    return this.sumofhour(values);
  }
  update(id, updateAttivitaprevDto) {
    return this.repo.update(+id, updateAttivitaprevDto);
  }
  remove(id) {
    return this.repo.delete(id);
  }
  async loadfrompreventivo(id) {
    return await this.repo.find({
      where: { IdPreventivo: id },
    });
  }
  async updateprev(id, nome, ore) {
    return await (0, typeorm_2.getRepository)(
      attivitaprev_entity_1.Attivitaprev
    )
      .createQueryBuilder("attivitaprev")
      .update(attivitaprev_entity_1.Attivitaprev, { nome: nome })
      .update(attivitaprev_entity_1.Attivitaprev, { ore: ore })
      .where("attivitaprev.id = :id", { id: id })
      .updateEntity(true)
      .execute();
  }
  async reportpreventivo(id) {
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
      const csvExporter = new export_to_csv_1.ExportToCsv(options);
      const report = csvExporter.generateCsv(JSON.stringify(data), true);
      fs.writeFileSync("dataprev.csv", report);
      return true;
    } catch (err) {
      console.log("Errore generazione csv: " + err);
      return false;
    }
  }
};
AttivitaprevService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(
      0,
      (0, typeorm_1.InjectRepository)(attivitaprev_entity_1.Attivitaprev)
    ),
    __metadata("design:paramtypes", [typeorm_2.Repository]),
  ],
  AttivitaprevService
);
exports.AttivitaprevService = AttivitaprevService;
//# sourceMappingURL=attivitaprev.service.js.map
