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
exports.Attivitacommessa = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const commessa_entity_1 = require("../../commessa/entities/commessa.entity");
const utente_entity_1 = require("../../utente/entities/utente.entity");
let Attivitacommessa = class Attivitacommessa extends typeorm_1.BaseEntity {};
__decorate(
  [(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata("design:type", Number)],
  Attivitacommessa.prototype,
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
  Attivitacommessa.prototype,
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
  Attivitacommessa.prototype,
  "datacreazione",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", String)],
  Attivitacommessa.prototype,
  "ore",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)(),
    (0, typeorm_1.OneToOne)(
      () => commessa_entity_1.Commessa,
      (commessa) => commessa.id
    ),
    __metadata("design:type", Number),
  ],
  Attivitacommessa.prototype,
  "IdCommessa",
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
  Attivitacommessa.prototype,
  "IdUtente",
  void 0
);
Attivitacommessa = __decorate([(0, typeorm_1.Entity)()], Attivitacommessa);
exports.Attivitacommessa = Attivitacommessa;
//# sourceMappingURL=attivitacommessa.entity.js.map
