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
exports.ClienteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cliente_entity_1 = require("./entities/cliente.entity");
let ClienteService = class ClienteService {
  constructor(repo) {
    this.repo = repo;
  }
  create(createClienteDto) {
    return this.repo.save(createClienteDto);
  }
  findAll() {
    return this.repo.find();
  }
  findOne(id) {
    return this.repo.findOne(+id);
  }
  update(id, updateClienteDto) {
    return this.repo.update(id, updateClienteDto);
  }
  remove(id) {
    return `This action removes a #${id} cliente`;
  }
  async updatestate(id, enable) {
    return await (0, typeorm_2.createQueryBuilder)("cliente")
      .update(cliente_entity_1.Cliente, { enable: enable })
      .where("cliente.id = :id", { id: id })
      .updateEntity(true)
      .execute();
  }
};
ClienteService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cliente_entity_1.Cliente)),
    __metadata("design:paramtypes", [typeorm_2.Repository]),
  ],
  ClienteService
);
exports.ClienteService = ClienteService;
//# sourceMappingURL=cliente.service.js.map
