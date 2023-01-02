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
exports.PreventivoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const utente_entity_1 = require("../utente/entities/utente.entity");
const typeorm_2 = require("typeorm");
const base_service_1 = require("../base-services/base.service");
const config_service_1 = require("../config/config.service");
const preventivo_media_url_resolver_processor_1 = require("../middleware/processors/post-processors/url_resolver/preventivo-media-url-resolver.processor");
const preventivo_entity_1 = require("./entities/preventivo.entity");
let PreventivoService = class PreventivoService extends base_service_1.BaseService {
  constructor(repo, configService) {
    super(repo, preventivo_entity_1.Preventivo);
    this.repo = repo;
    this.configService = configService;
    this.addPostProcessor(
      new preventivo_media_url_resolver_processor_1.PreventivoMediaUrlResolverProcessor(
        configService
      )
    );
  }
  createPreventivo(createAmministratoreDto) {
    return this.repo.save(createAmministratoreDto);
  }
  findAll() {
    return this.repo.find();
  }
  findOne(id) {
    return this.getOneByIdAndRelations(id, ["gallery"]);
  }
  updatePreventivo(id, updatePreventivoDto) {
    return this.repo.update(+id, updatePreventivoDto);
  }
  deletePreventivo(id) {
    return this.repo.delete(+id);
  }
  async contapreventiviperdataperutenteprev(datacreazione, dataaccettazione) {
    return await (0, typeorm_2.getRepository)(preventivo_entity_1.Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione and preventivo.stato<:PreventivoRole",
        {
          datacreazione: datacreazione,
          dataaccettazione: dataaccettazione,
          PreventivoRole: preventivo_entity_1.PreventivoRole.CLOSED,
        }
      )
      .getMany();
  }
  async contapreventiviperdataperutente(
    idUtente,
    datacreazione,
    dataaccettazione
  ) {
    return await (0, typeorm_2.getRepository)(preventivo_entity_1.Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.IdUtente=:IdUtente and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione ",
        {
          IdUtente: idUtente,
          datacreazione: datacreazione,
          dataaccettazione: dataaccettazione,
        }
      )
      .getMany();
  }
  async contaperutente(
    idUtente,
    isPreventiviVenduti,
    datacreazione,
    dataaccettazione
  ) {
    if (!isPreventiviVenduti) {
      return await this.repo
        .createQueryBuilder("preventivo")
        .where(
          "preventivo.IdUtente=:IdUtente and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione ",
          {
            IdUtente: idUtente,
            datacreazione: datacreazione,
            dataaccettazione: dataaccettazione,
          }
        )
        .getCount();
    }
    if (isPreventiviVenduti) {
      return await (0, typeorm_2.getRepository)(preventivo_entity_1.Preventivo)
        .createQueryBuilder("preventivo")
        .where(
          "preventivo.IdUtente=:IdUtente and preventivo.stato=:stato and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione ",
          {
            stato: preventivo_entity_1.PreventivoRole.CLOSED,
            IdUtente: idUtente,
            datacreazione: datacreazione,
            dataaccettazione: dataaccettazione,
          }
        )
        .getCount();
    }
  }
  async totalevendutoutente(idUtente, datacreazione, dataaccettazione) {
    var preventivi = await (0, typeorm_2.getRepository)(
      preventivo_entity_1.Preventivo
    )
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.IdUtente=:IdUtente  and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione",
        {
          IdUtente: idUtente,
          datacreazione: datacreazione,
          dataaccettazione: dataaccettazione,
        }
      )
      .getMany();
    var totale = 0;
    for (var i = 0; i < preventivi.length; i++) {
      totale = totale + preventivi[i].prezzoscontato;
    }
    return totale;
  }
  async contapreventivisede(sede, datacreazione, dataaccettazione) {
    return await (0, typeorm_2.getRepository)(preventivo_entity_1.Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.sede =:sede and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione",
        {
          sede: sede,
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
        }
      )
      .getCount();
  }
  async contapreventivisedevendutiglobale(datacreazione, dataaccettazione) {
    return await (0, typeorm_2.getRepository)(preventivo_entity_1.Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione and preventivo.stato=:PreventivoRole",
        {
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
          PreventivoRole: preventivo_entity_1.PreventivoRole.CLOSED,
        }
      )
      .getCount();
  }
  async contapreventivisedevendutiinfo(sede, datacreazione, dataaccettazione) {
    return await (0, typeorm_2.getRepository)(preventivo_entity_1.Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.sede =:sede and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione and preventivo.stato=:PreventivoRole",
        {
          sede: sede,
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
          PreventivoRole: preventivo_entity_1.PreventivoRole.CLOSED,
        }
      )
      .getMany();
  }
  async contapreventivisedevenduti(sede, datacreazione, dataaccettazione) {
    return await (0, typeorm_2.getRepository)(preventivo_entity_1.Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.sede =:sede and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione and preventivo.stato=:PreventivoRole",
        {
          sede: sede,
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
          PreventivoRole: preventivo_entity_1.PreventivoRole.CLOSED,
        }
      )
      .getCount();
  }
  async contapreventivirage(datacreazione, dataaccettazione) {
    return await (0, typeorm_2.getRepository)(preventivo_entity_1.Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione",
        {
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
        }
      )
      .getCount();
  }
  async sommatotalevendutoglobale(datacreazione, dataaccettazione) {
    var lista = await (0, typeorm_2.getRepository)(
      preventivo_entity_1.Preventivo
    )
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione and preventivo.stato=:PreventivoRole",
        {
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
          PreventivoRole: preventivo_entity_1.PreventivoRole.CLOSED,
        }
      )
      .getMany();
    return lista
      .filter((item) => item)
      .reduce((sum, current) => sum + current.prezzototale, 0);
  }
  async sommatotalevenduto(sede, datacreazione, dataaccettazione) {
    var lista = await (0, typeorm_2.getRepository)(
      preventivo_entity_1.Preventivo
    )
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.sede =:sede and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione and preventivo.stato=:PreventivoRole",
        {
          sede: sede,
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
          PreventivoRole: preventivo_entity_1.PreventivoRole.CLOSED,
        }
      )
      .getMany();
    return lista
      .filter((item) => item)
      .reduce((sum, current) => sum + current.prezzototale, 0);
  }
  async sommaprezzitotaliglobale(datacreazione, dataaccettazione) {
    var lista = await (0, typeorm_2.getRepository)(
      preventivo_entity_1.Preventivo
    )
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione",
        {
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
        }
      )
      .getMany();
    return lista
      .filter((item) => item)
      .reduce((sum, current) => sum + current.prezzototale, 0);
  }
  async sommaprezzitotali(sede, datacreazione, dataaccettazione) {
    var lista = await (0, typeorm_2.getRepository)(
      preventivo_entity_1.Preventivo
    )
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.sede =:sede and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione",
        {
          sede: sede,
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
        }
      )
      .getMany();
    return lista
      .filter((item) => item)
      .reduce((sum, current) => sum + current.prezzoscontato, 0);
  }
  async totalepreventiviutente(idUtente, datacreazione, dataaccettazione) {
    var preventivi = await (0, typeorm_2.getRepository)(
      preventivo_entity_1.Preventivo
    )
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.IdUtente=:IdUtente and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione",
        {
          IdUtente: idUtente,
          datacreazione: datacreazione,
          dataaccettazione: dataaccettazione,
        }
      )
      .getMany();
    var totale = 0;
    for (var i = 0; i < preventivi.length; i++) {
      totale = totale + preventivi[i].prezzoscontato;
    }
    return totale;
  }
  async confirm(id, idUtente, dataaccettazione, prezzoscontato) {
    return await (0, typeorm_2.getRepository)(preventivo_entity_1.Preventivo)
      .createQueryBuilder("preventivo")
      .update(preventivo_entity_1.Preventivo, {
        stato: preventivo_entity_1.PreventivoRole.CLOSED,
        IdVenditore: idUtente,
        dataaccettazione: dataaccettazione,
        prezzoscontato: prezzoscontato,
      })
      .where("preventivo.id = :id", { id: id })
      .updateEntity(true)
      .execute();
  }
  async searchbyid(role, id) {
    if (
      role === utente_entity_1.UserRole.ADMIN ||
      role === utente_entity_1.UserRole.CONTROLLER ||
      role === utente_entity_1.UserRole.COMMERCIAL
    ) {
      return await (0, typeorm_2.getRepository)(preventivo_entity_1.Preventivo)
        .createQueryBuilder("preventivo")
        .where("preventivo.stato =:stato", {
          stato: preventivo_entity_1.PreventivoRole.IN_PROGRESS,
        })
        .getMany();
    } else if (role == utente_entity_1.UserRole.QUOTATOR) {
      return await (0, typeorm_2.getRepository)(preventivo_entity_1.Preventivo)
        .createQueryBuilder("preventivo")
        .where("preventivo.stato =:stato and preventivo.IdUtente =:IdUtente ", {
          stato: preventivo_entity_1.PreventivoRole.IN_PROGRESS,
          IdUtente: id.toString(),
        })
        .getMany();
    } else {
      throw new common_1.UnauthorizedException();
    }
  }
};
PreventivoService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(preventivo_entity_1.Preventivo)),
    __metadata("design:paramtypes", [
      typeorm_2.Repository,
      config_service_1.ConfigService,
    ]),
  ],
  PreventivoService
);
exports.PreventivoService = PreventivoService;
//# sourceMappingURL=preventivo.service.js.map
