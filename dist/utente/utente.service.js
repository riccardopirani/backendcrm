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
exports.UtenteService = exports.decrypt = exports.encrypt = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const utente_entity_1 = require("./entities/utente.entity");
const crypto = require("crypto");
function encrypt(text) {
  return Buffer.from(text).toString("base64");
}
exports.encrypt = encrypt;
function decrypt(text) {
  return Buffer.from(text, "base64").toString("ascii");
}
exports.decrypt = decrypt;
let UtenteService = class UtenteService {
  constructor(repo) {
    this.repo = repo;
  }
  async create(dto) {
    if (dto.cellulare === undefined) {
      dto.cellulare = "000000000";
    }
    if (dto.telefono === undefined) {
      dto.telefono = "000000000";
    }
    dto.enable = true;
    dto.password = encrypt(dto.password);
    return this.repo.save(dto);
  }
  async Login(dto) {
    console.log("Pwd: " + encrypt(dto.password));
    return this.repo.findOne({
      username: dto.username,
      password: encrypt(dto.password),
    });
  }
  findAll() {
    return this.repo.find();
  }
  findOne(id) {
    return this.repo.findOne(id);
  }
  update(id, updateUtenteDto) {
    return this.repo.update(id, updateUtenteDto);
  }
  remove(id) {
    return `This action removes a #${id} utente`;
  }
  async updapassword(id, password) {
    var paswdcrypt = encrypt(password);
    return await (0, typeorm_2.createQueryBuilder)("utente")
      .update(utente_entity_1.Utente, { password: paswdcrypt.toString() })
      .where("utente.id = :id", { id: id })
      .updateEntity(true)
      .execute();
  }
  async updatestate(id, enable) {
    return await (0, typeorm_2.createQueryBuilder)("utente")
      .update(utente_entity_1.Utente, { enable: enable })
      .where("utente.id = :id", { id: id })
      .updateEntity(true)
      .execute();
  }
};
UtenteService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(utente_entity_1.Utente)),
    __metadata("design:paramtypes", [typeorm_2.Repository]),
  ],
  UtenteService
);
exports.UtenteService = UtenteService;
//# sourceMappingURL=utente.service.js.map
