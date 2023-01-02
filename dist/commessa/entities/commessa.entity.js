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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commessa = exports.CommessaRole = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const utente_entity_1 = require("../../utente/entities/utente.entity");
const cliente_entity_1 = require("../../cliente/entities/cliente.entity");
const preventivo_entity_1 = require("../../preventivo/entities/preventivo.entity");
var CommessaRole;
(function (CommessaRole) {
  CommessaRole["IN_PROGRESS"] = "IN_PROGRESS";
  CommessaRole["CLOSED"] = "CLOSED";
})((CommessaRole = exports.CommessaRole || (exports.CommessaRole = {})));
let Commessa = class Commessa extends typeorm_1.BaseEntity {};
__decorate(
  [(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata("design:type", Number)],
  Commessa.prototype,
  "id",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ length: 150 }),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(150),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String),
  ],
  Commessa.prototype,
  "nome",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({
      type: "enum",
      enum: CommessaRole,
    }),
    __metadata("design:type", String),
  ],
  Commessa.prototype,
  "state",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ length: 150 }),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(150),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String),
  ],
  Commessa.prototype,
  "sede",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date),
  ],
  Commessa.prototype,
  "datacreazione",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)(),
    (0, typeorm_1.OneToOne)(
      () => utente_entity_1.Utente,
      (user) => user.id
    ),
    __metadata("design:type", Number),
  ],
  Commessa.prototype,
  "IdUtente",
  void 0
);
__decorate(
  [
    (0, typeorm_1.OneToOne)(
      () => preventivo_entity_1.Preventivo,
      (prev) => prev.id
    ),
    (0, typeorm_1.JoinColumn)({ name: "IdPreventivo" }),
    __metadata("design:type", preventivo_entity_1.Preventivo),
  ],
  Commessa.prototype,
  "preventivo",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", Number)],
  Commessa.prototype,
  "IdPreventivo",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date),
  ],
  Commessa.prototype,
  "datachiusura",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)(),
    (0, typeorm_1.OneToOne)(
      () => cliente_entity_1.Cliente,
      (c) => c.id
    ),
    __metadata("design:type", Number),
  ],
  Commessa.prototype,
  "IdCliente",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date),
  ],
  Commessa.prototype,
  "dataconsegna",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "simple-array", nullable: true }),
    __metadata("design:type", Array),
  ],
  Commessa.prototype,
  "IdOperatori",
  void 0
);
Commessa = __decorate([(0, typeorm_1.Entity)()], Commessa);
exports.Commessa = Commessa;
//# sourceMappingURL=commessa.entity.js.map
