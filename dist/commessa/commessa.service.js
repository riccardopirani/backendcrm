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
exports.CommessaService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../base-services/base.service");
const config_service_1 = require("../config/config.service");
const commessa_media_url_resolver_processor_1 = require("../middleware/processors/post-processors/url_resolver/commessa-media-url-resolver.processor");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const commessa_entity_1 = require("./entities/commessa.entity");
const export_to_csv_1 = require("export-to-csv");
const fs = require("fs");
let CommessaService = class CommessaService extends base_service_1.BaseService {
  constructor(repo, configService) {
    super(repo, commessa_entity_1.Commessa);
    this.repo = repo;
    this.configService = configService;
    this.addPostProcessor(
      new commessa_media_url_resolver_processor_1.CommessaMediaUrlResolverProcessor(
        configService
      )
    );
  }
  createCommessa(dto) {
    return this.repo.save(dto);
  }
  findAll() {
    return this.repo.find();
  }
  async findByRagioneSociale(ragioneSociale) {
    return await (0, typeorm_2.getRepository)(commessa_entity_1.Commessa)
      .createQueryBuilder("commessa")
      .where("commessa.nome like :nome", { nome: `%${ragioneSociale}%` })
      .getMany();
  }
  findOne(id) {
    return this.getOneByIdAndRelations(+id, [
      "preventivo",
      "preventivo.gallery",
    ]);
  }
  async findbyState(state, idOperatore) {
    var commesse = await this.repo.find({ where: { state: state } });
    var commesseload = [];
    for (var i = 0; i < commesse.length; i++) {
      if (commesse[i].IdOperatori !== null) {
        var commessatemp = commesse[i].IdOperatori.filter(
          (value) => value == idOperatore
        );
        if (commessatemp.length > 0) {
          commesseload.push(commesse[i]);
        }
      }
    }
    return commesseload;
  }
  async updateCommessa(id, updateCommessaDto) {
    return await this.repo.update(+id, updateCommessaDto);
  }
  async loadbyIdPreventivo(IdPreventivo) {
    return await this.repo.find({ where: { IdPreventivo: IdPreventivo } });
  }
  async updateidoperatore(id, arrayvalue) {
    return await (0, typeorm_2.createQueryBuilder)("commessa")
      .update(commessa_entity_1.Commessa, { IdOperatori: arrayvalue })
      .where("commessa.id = :id", { id: id })
      .updateEntity(true)
      .execute();
  }
  async loadfromcommessa(id, dataInzio, dataFine) {
    return await this.repo
      .createQueryBuilder("commessa")
      .where("commessa.datacreazione > :datacreazione", {
        datacreazione: dataInzio,
      })
      .where("commessa.datachiusura > :dataFine", { dataFine: dataFine })
      .getMany();
  }
  async report(id, start, end) {
    try {
      var data = await this.loadfromcommessa(id, start, end);
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
      fs.writeFileSync("stampacommessa.csv", report);
      return true;
    } catch (err) {
      console.log("Errore generazione csv: " + err);
      return false;
    }
  }
};
CommessaService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(commessa_entity_1.Commessa)),
    __metadata("design:paramtypes", [
      typeorm_2.Repository,
      config_service_1.ConfigService,
    ]),
  ],
  CommessaService
);
exports.CommessaService = CommessaService;
//# sourceMappingURL=commessa.service.js.map
