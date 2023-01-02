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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const commessa_service_1 = require("../commessa/commessa.service");
const utente_service_1 = require("../utente/utente.service");
const preventivo_service_1 = require("../preventivo/preventivo.service");
const attivitaprev_service_1 = require("../attivitaprev/attivitaprev.service");
const attivitacommessa_service_1 = require("../attivitacommessa/attivitacommessa.service");
const preventivo_entity_1 = require("../preventivo/entities/preventivo.entity");
const export_to_csv_1 = require("export-to-csv");
const utente_entity_1 = require("../utente/entities/utente.entity");
const swagger_decorator_1 = require("../utils/swagger/swagger.decorator");
const fs_1 = require("fs");
const path_1 = require("path");
const fs = require("fs");
let ReportController = class ReportController {
  constructor(
    commessaService,
    utenteService,
    attivitaPreventivoService,
    attivitaCommessaService,
    preventivoService
  ) {
    this.commessaService = commessaService;
    this.utenteService = utenteService;
    this.attivitaPreventivoService = attivitaPreventivoService;
    this.attivitaCommessaService = attivitaCommessaService;
    this.preventivoService = preventivoService;
  }
  async findAll(datafine, datainizio) {
    let listaUtenti = await this.utenteService.findAll();
    let returnvalue = [];
    let returnvaluejson = [];
    let obejctfirst = {
      idUtente: "IdUtente",
      Nome: "Nome",
      Cognome: "Cognome",
      Ruolo: "Ruolo",
      PreventiviUtente: "PreventiviUtente",
      PreventiviVenduti: "PreventiviVenduti",
      DifferenzaPreventivi: "DifferenzaPreventivi",
      DifferenzaPreventiviPercentuale: "DifferenzaPreventiviPercentuale",
      TotalePreventivato: "TotalePreventivato",
      TotaleVenduto: "TotaleVenduto",
      DifferenzaPreventivatoVenduto: "DifferenzaPreventivatoVenduto",
      DifferenzaPreventivatoVendutoPercentuale:
        "DifferenzaPreventivatoVendutoPercentuale",
      AttivitaPrevista: "AttivitaPrevista",
      AttivitaEseguite: "AttivitaEseguite",
      DifferenzaAttivitaEseguitePreviste: "DifferenzaAttivitaEseguitePreviste",
      DifferenzaAttivitaEseguitePercentuale:
        "DifferenzaAttivitaEseguitePercentuale",
    };
    returnvalue.push(obejctfirst);
    for (let i = 0; i < listaUtenti.length; i++) {
      if (
        listaUtenti[i].ruolo === utente_entity_1.UserRole.COMMERCIAL ||
        listaUtenti[i].ruolo === utente_entity_1.UserRole.QUOTATOR
      ) {
        let idUtente = listaUtenti[i].id;
        let nome = listaUtenti[i].nome;
        let cognome = listaUtenti[i].cognome;
        let ruolo = listaUtenti[i].ruolo;
        let contapreventiviutente = await this.preventivoService.contaperutente(
          idUtente,
          false,
          datainizio,
          datafine
        );
        let totalevenduto = await this.preventivoService.totalevendutoutente(
          idUtente,
          datainizio,
          datafine
        );
        let totaleeuropreventivi =
          await this.preventivoService.totalepreventiviutente(
            idUtente,
            datainizio,
            datafine
          );
        let contapreventiviutentevenduti =
          await this.preventivoService.contaperutente(
            idUtente,
            true,
            datainizio,
            datafine
          );
        let diffprevvenduti =
          contapreventiviutente - contapreventiviutentevenduti;
        let differenzapercentuale =
          ((contapreventiviutente - contapreventiviutentevenduti) /
            contapreventiviutente) *
          100;
        let differenzapercentuale2 =
          ((totaleeuropreventivi - totalevenduto) / totaleeuropreventivi) * 100;
        if (
          differenzapercentuale === 0 ||
          differenzapercentuale === null ||
          !differenzapercentuale
        ) {
          differenzapercentuale = 0;
        }
        if (
          differenzapercentuale2 === 0 ||
          differenzapercentuale2 === null ||
          !differenzapercentuale2
        ) {
          differenzapercentuale2 = 0;
        }
        let preventiviindata =
          await this.preventivoService.contapreventiviperdataperutente(
            idUtente,
            datainizio,
            datafine
          );
        let attivitaprev = 0,
          attivitaeseguite = 0;
        if (preventiviindata.length > 0) {
          for (let i = 0; i < preventiviindata.length; i++) {
            attivitaprev =
              attivitaprev +
              (await this.attivitaPreventivoService.getTotaleAttivitaPreviste(
                preventiviindata[i].id
              ));
            let commesseassociateapreventivo =
              await this.commessaService.loadbyIdPreventivo(
                preventiviindata[i].id
              );
            for (let i2 = 0; i2 < commesseassociateapreventivo.length; i2++) {
              attivitaeseguite =
                attivitaeseguite +
                (await this.attivitaCommessaService.getTotaleAttivitaPreviste(
                  commesseassociateapreventivo[i2].id
                ));
            }
          }
        } else {
          console.log("Nessun preventivo in data");
        }
        let differenzapercentualeattivitaprev =
          ((attivitaprev - attivitaeseguite) / attivitaprev) * 100;
        let obejct = {
          idUtente: idUtente,
          Nome: nome,
          Cognome: cognome,
          Ruolo: ruolo,
          PreventiviUtente: contapreventiviutente,
          PreventiviVenduti: contapreventiviutentevenduti,
          DifferenzaPreventivi: diffprevvenduti,
          DifferenzaPreventiviPercentuale: differenzapercentuale,
          TotalePreventivato: totaleeuropreventivi,
          TotaleVenduto: totalevenduto,
          DifferenzaPreventivatoVenduto: totaleeuropreventivi - totalevenduto,
          DifferenzaPreventivatoVendutoPercentuale: differenzapercentuale2,
          AttivitaPrevista: attivitaprev,
          AttivitaEseguite: attivitaeseguite,
          DifferenzaAttivitaEseguitePreviste: attivitaprev - attivitaeseguite,
          DifferenzaAttivitaEseguitePercentuale:
            differenzapercentualeattivitaprev,
        };
        returnvaluejson.push(obejct);
        returnvalue.push(obejct);
      }
    }
    try {
      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "Report Preventivi e Commesse",
        useTextFile: false,
        useBom: true,
      };
      const csvExporter = new export_to_csv_1.ExportToCsv(options);
      const report = csvExporter.generateCsv(JSON.stringify(returnvalue), true);
      fs.writeFileSync("reportprevecommesse.csv", report);
    } catch (err) {
      console.log("Errore generazione csv: " + err);
    }
    return returnvaluejson;
  }
  getFile() {
    const file = (0, fs_1.createReadStream)(
      (0, path_1.join)(process.cwd(), "dataprevsede.csv")
    );
    return new common_1.StreamableFile(file);
  }
  getFileUtente() {
    const file = (0, fs_1.createReadStream)(
      (0, path_1.join)(process.cwd(), "reportprevecommesse.csv")
    );
    return new common_1.StreamableFile(file);
  }
  getFileGlobale() {
    const file = (0, fs_1.createReadStream)(
      (0, path_1.join)(process.cwd(), "dataprevglobale.csv")
    );
    return new common_1.StreamableFile(file);
  }
  async persede(datafine, datainizio) {
    let returnvalue = [];
    let returnvaluejson = [];
    let obejctfirst = {
      Location: "Location",
      TotalePreventivi: "TotalePreventivi",
      TotalePreventiviVenduti: "TotalePreventiviVenduti",
      DifferenzaEffettuatiVenduti: "DifferenzaEffettuatiVenduti",
      DifferenzaEffettuatiVendutiPercentuale:
        "DifferenzaEffettuatiVendutiPercentuale",
      TotalePreventivato: "TotalePreventivato",
      TotaleVenduto: "TotaleVenduto",
      DifferenzaPreventivatoVenduto: "DifferenzaPreventivatoVenduto",
      DifferenzaPreventivatoVendutoPercentuale:
        "DifferenzaPreventivatoVendutoPercentuale",
      AttivitaPreviste: "AttivitaPreviste",
      AttivitaConsutivo: "AttivitaConsutivo",
      DifferenzaAttivitaPrev: "DifferenzaAttivitaPrev",
      DifferenzaAttivitaPercentuale: "DifferenzaAttivitaPercentuale",
    };
    returnvalue.push(obejctfirst);
    for (let key in preventivo_entity_1.Location) {
      let locale = preventivo_entity_1.Location[key];
      let preventivi = await this.preventivoService.contapreventivisede(
        locale,
        datainizio,
        datafine
      );
      let preventivivenduti =
        await this.preventivoService.contapreventivisedevenduti(
          locale,
          datainizio,
          datafine
        );
      let preventivivendutiglobale =
        await this.preventivoService.contapreventivisedevendutiinfo(
          locale,
          datainizio,
          datafine
        );
      let differenzapercentulaprev = 0;
      let totalepreventivato = await this.preventivoService.sommaprezzitotali(
        locale,
        datainizio,
        datafine
      );
      let sommatotalevenduto = await this.preventivoService.sommatotalevenduto(
        locale,
        datainizio,
        datafine
      );
      let differenzapreventivatovenduto = 0;
      let attivitaprev = 0;
      let attivitaconsu = 0;
      let diffattivitaperc = 0;
      if (preventivi > 0) {
        differenzapercentulaprev =
          ((preventivi - preventivivenduti) / preventivi) * 100;
        differenzapreventivatovenduto =
          ((totalepreventivato - sommatotalevenduto) / totalepreventivato) *
          100;
        try {
          for (let i = 0; i < preventivivendutiglobale.length; i++) {
            attivitaprev =
              attivitaprev +
              (await this.attivitaPreventivoService.getTotaleAttivitaPreviste(
                preventivivendutiglobale[i].id
              ));
            let commesseassociateapreventivo =
              await this.commessaService.loadbyIdPreventivo(
                preventivivendutiglobale[i].id
              );
            attivitaconsu =
              attivitaconsu +
              (await this.attivitaCommessaService.getTotaleAttivitaPreviste(
                commesseassociateapreventivo[0].id
              ));
            diffattivitaperc =
              ((attivitaprev - attivitaconsu) / attivitaprev) * 100;
          }
        } catch (err) {
          console.log("Errore: " + err);
        }
      }
      let obejct = {
        Location: locale,
        TotalePreventivi: preventivi,
        TotalePreventiviVenduti: preventivivenduti,
        DifferenzaEffettuatiVenduti: preventivi - preventivivenduti,
        DifferenzaEffettuatiVendutiPercentuale: differenzapercentulaprev,
        TotalePreventivato: totalepreventivato,
        TotaleVenduto: sommatotalevenduto,
        DifferenzaPreventivatoVenduto: totalepreventivato - sommatotalevenduto,
        DifferenzaPreventivatoVendutoPercentuale: differenzapreventivatovenduto,
        AttivitaPreviste: attivitaprev,
        AttivitaConsutivo: attivitaconsu,
        DifferenzaAttivitaPrev: attivitaprev - attivitaconsu,
        DifferenzaAttivitaPercentuale: diffattivitaperc,
      };
      returnvaluejson.push(obejct);
      returnvalue.push(obejct);
    }
    try {
      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "Report per Sede",
        useTextFile: false,
        useBom: true,
      };
      const csvExporter = new export_to_csv_1.ExportToCsv(options);
      const report = csvExporter.generateCsv(JSON.stringify(returnvalue), true);
      fs.writeFileSync("dataprevsede.csv", report);
    } catch (err) {
      console.log("Errore generazione csv: " + err);
    }
    return returnvaluejson;
  }
  async reporbale(datafine, datainizio) {
    var returnvalue = [];
    let obejctfirst = {
      TotalePreventivi: "TotalePreventivi",
      TotalePreventiviVenduti: "TotalePreventiviVenduti",
      DifferenzaEffettuatiVenduti: "DifferenzaEffettuatiVenduti",
      DifferenzaEffettuatiVendutiPercentuale:
        "DifferenzaEffettuatiVendutiPercentuale",
      TotalePreventivato: "TotalePreventivato",
      TotaleVenduto: "TotaleVenduto",
      DifferenzaPreventivatoVenduto: "DifferenzaPreventivatoVenduto",
      DifferenzaPreventivatoVendutoPercentuale:
        "DifferenzaPreventivatoVendutoPercentuale",
      AttivitaPreviste: "AttivitaPreviste",
      AttivitaConsutivo: "AttivitaConsutivo",
      DifferenzaAttivitaPrev: "DifferenzaAttivitaPrev",
      DifferenzaAttivitaPercentuale: "DifferenzaAttivitaPercentuale",
    };
    returnvalue.push(obejctfirst);
    let preventivi = await this.preventivoService.contapreventivirage(
      datainizio,
      datafine
    );
    let preventivivenduti =
      await this.preventivoService.contapreventivisedevendutiglobale(
        datainizio,
        datafine
      );
    let differenzapercentulaprev = 0;
    let totalepreventivato =
      await this.preventivoService.sommaprezzitotaliglobale(
        datainizio,
        datafine
      );
    let sommatotalevenduto =
      await this.preventivoService.sommatotalevendutoglobale(
        datainizio,
        datafine
      );
    let differenzapreventivatovenduto = 0;
    let attivitaprev = 0;
    let attivitaconsu = 0;
    let diffattivitaperc = 0;
    if (preventivi > 0) {
      differenzapercentulaprev =
        ((preventivi - preventivivenduti) / preventivi) * 100;
      differenzapreventivatovenduto =
        ((totalepreventivato - sommatotalevenduto) / totalepreventivato) * 100;
      let preventiviindata =
        await this.preventivoService.contapreventiviperdataperutenteprev(
          datainizio,
          datafine
        );
      for (let i = 0; i < preventiviindata.length; i++) {
        attivitaprev =
          attivitaprev +
          (await this.attivitaPreventivoService.getTotaleAttivitaPreviste(
            preventiviindata[i].id
          ));
        let commesseassociateapreventivo =
          await this.commessaService.loadbyIdPreventivo(preventiviindata[i].id);
        attivitaconsu =
          attivitaconsu +
          (await this.attivitaCommessaService.getTotaleAttivitaPreviste(
            commesseassociateapreventivo[0].id
          ));
        diffattivitaperc =
          ((attivitaprev - attivitaconsu) / attivitaprev) * 100;
      }
    }
    let obejct2 = {
      TotalePreventivi: preventivi,
      TotalePreventiviVenduti: preventivivenduti,
      DifferenzaEffettuatiVenduti: preventivi - preventivivenduti,
      DifferenzaEffettuatiVendutiPercentuale: differenzapercentulaprev,
      TotalePreventivato: totalepreventivato,
      TotaleVenduto: sommatotalevenduto,
      DifferenzaPreventivatoVenduto: totalepreventivato - sommatotalevenduto,
      DifferenzaPreventivatoVendutoPercentuale: differenzapreventivatovenduto,
      AttivitaPreviste: attivitaprev,
      AttivitaConsutivo: attivitaconsu,
      DifferenzaAttivitaPrev: attivitaprev - attivitaconsu,
      DifferenzaAttivitaPercentuale: diffattivitaperc,
    };
    returnvalue.push(obejct2);
    var list = [];
    list.push(obejct2);
    try {
      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "Report globale",
        useTextFile: false,
        useBom: true,
      };
      const csvExporter = new export_to_csv_1.ExportToCsv(options);
      const report = csvExporter.generateCsv(JSON.stringify(returnvalue), true);
      fs.writeFileSync("dataprevglobale.csv", report);
    } catch (err) {
      console.log("Errore generazione csv: " + err);
    }
    return obejct2;
  }
};
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)("/utente"),
    __param(0, (0, common_1.Query)("datafine")),
    __param(1, (0, common_1.Query)("datainizio")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date, Date]),
    __metadata("design:returntype", Promise),
  ],
  ReportController.prototype,
  "findAll",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)("/sede/csv"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", common_1.StreamableFile),
  ],
  ReportController.prototype,
  "getFile",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)("/utente/csv"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", common_1.StreamableFile),
  ],
  ReportController.prototype,
  "getFileUtente",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)("/globale/csv"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", common_1.StreamableFile),
  ],
  ReportController.prototype,
  "getFileGlobale",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)("/sede"),
    __param(0, (0, common_1.Query)("datafine")),
    __param(1, (0, common_1.Query)("datainizio")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date, Date]),
    __metadata("design:returntype", Promise),
  ],
  ReportController.prototype,
  "persede",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)("/globale"),
    __param(0, (0, common_1.Query)("datafine")),
    __param(1, (0, common_1.Query)("datainizio")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date, Date]),
    __metadata("design:returntype", Promise),
  ],
  ReportController.prototype,
  "reporbale",
  null
);
ReportController = __decorate(
  [
    (0, swagger_1.ApiTags)("report"),
    (0, common_1.Controller)("report"),
    __metadata("design:paramtypes", [
      commessa_service_1.CommessaService,
      utente_service_1.UtenteService,
      attivitaprev_service_1.AttivitaprevService,
      attivitacommessa_service_1.AttivitacommessaService,
      preventivo_service_1.PreventivoService,
    ]),
  ],
  ReportController
);
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map
