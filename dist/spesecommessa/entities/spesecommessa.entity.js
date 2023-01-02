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
exports.Spesecommessa = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const utente_entity_1 = require("../../utente/entities/utente.entity");
const commessa_entity_1 = require("../../commessa/entities/commessa.entity");
let Spesecommessa = class Spesecommessa extends typeorm_1.BaseEntity {};
__decorate(
  [(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata("design:type", Number)],
  Spesecommessa.prototype,
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
  Spesecommessa.prototype,
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
  Spesecommessa.prototype,
  "datacreazione",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: false, type: "float" }),
    __metadata("design:type", Number),
  ],
  Spesecommessa.prototype,
  "costo",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)(),
    (0, typeorm_1.OneToOne)(
      (type) => commessa_entity_1.Commessa,
      (commesa) => commesa.id
    ),
    __metadata("design:type", Number),
  ],
  Spesecommessa.prototype,
  "IdCommessa",
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
  Spesecommessa.prototype,
  "IdUtente",
  void 0
);
Spesecommessa = __decorate([(0, typeorm_1.Entity)()], Spesecommessa);
exports.Spesecommessa = Spesecommessa;
//# sourceMappingURL=spesecommessa.entity.js.map
