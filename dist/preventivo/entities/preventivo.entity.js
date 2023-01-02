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
exports.Preventivo = exports.Location = exports.PreventivoRole = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const utente_entity_1 = require("../../utente/entities/utente.entity");
const cliente_entity_1 = require("../../cliente/entities/cliente.entity");
const media_entity_1 = require("../../media/entities/media.entity");
var PreventivoRole;
(function (PreventivoRole) {
  PreventivoRole["IN_PROGRESS"] = "IN_PROGRESS";
  PreventivoRole["CLOSED"] = "CLOSED";
  PreventivoRole["DISCARDED"] = "DISCARDED";
})((PreventivoRole = exports.PreventivoRole || (exports.PreventivoRole = {})));
var Location;
(function (Location) {
  Location["BERGAMO"] = "BERGAMO";
  Location["CISERANO"] = "CISERANO";
  Location["LALLIO"] = "LALLIO";
  Location["MILANO"] = "MILANO";
})((Location = exports.Location || (exports.Location = {})));
let Preventivo = class Preventivo extends typeorm_1.BaseEntity {};
__decorate(
  [(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata("design:type", Number)],
  Preventivo.prototype,
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
  Preventivo.prototype,
  "nome",
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
  Preventivo.prototype,
  "datacreazione",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({
      type: "enum",
      enum: PreventivoRole,
    }),
    __metadata("design:type", String),
  ],
  Preventivo.prototype,
  "stato",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({
      type: "enum",
      enum: Location,
    }),
    __metadata("design:type", String),
  ],
  Preventivo.prototype,
  "sede",
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
  Preventivo.prototype,
  "IdCliente",
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
  Preventivo.prototype,
  "IdUtente",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.OneToOne)(
      () => utente_entity_1.Utente,
      (user) => user.id
    ),
    __metadata("design:type", Number),
  ],
  Preventivo.prototype,
  "IdVenditore",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date),
  ],
  Preventivo.prototype,
  "dataaccettazione",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date),
  ],
  Preventivo.prototype,
  "dataconsegna",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: true, type: "float" }),
    __metadata("design:type", Number),
  ],
  Preventivo.prototype,
  "prezzoscontato",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: true, type: "float" }),
    __metadata("design:type", Number),
  ],
  Preventivo.prototype,
  "prezzototale",
  void 0
);
__decorate(
  [
    (0, typeorm_1.OneToMany)(
      (type) => media_entity_1.Media,
      (media) => media.preventivo
    ),
    __metadata("design:type", Array),
  ],
  Preventivo.prototype,
  "gallery",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: true, type: "float" }),
    __metadata("design:type", Number),
  ],
  Preventivo.prototype,
  "spesepreviste",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: true, type: "float" }),
    __metadata("design:type", Number),
  ],
  Preventivo.prototype,
  "costomateriale",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String),
  ],
  Preventivo.prototype,
  "note",
  void 0
);
Preventivo = __decorate([(0, typeorm_1.Entity)()], Preventivo);
exports.Preventivo = Preventivo;
//# sourceMappingURL=preventivo.entity.js.map
