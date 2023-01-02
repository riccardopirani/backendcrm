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
exports.Attivitamateriale = void 0;
const typeorm_1 = require("typeorm");
const commessa_entity_1 = require("../../commessa/entities/commessa.entity");
const utente_entity_1 = require("../../utente/entities/utente.entity");
const materialeconsumo_entity_1 = require("../../materialeconsumo/entities/materialeconsumo.entity");
let Attivitamateriale = class Attivitamateriale extends typeorm_1.BaseEntity {};
__decorate(
  [(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata("design:type", Number)],
  Attivitamateriale.prototype,
  "id",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: false }),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.OneToOne)(
      (type) => commessa_entity_1.Commessa,
      (commessa) => commessa.id
    ),
    __metadata("design:type", Number),
  ],
  Attivitamateriale.prototype,
  "IdCommessa",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.OneToOne)(
      (type) => utente_entity_1.Utente,
      (utente) => utente.id
    ),
    __metadata("design:type", Number),
  ],
  Attivitamateriale.prototype,
  "IdUtente",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: false }),
    (0, typeorm_1.OneToOne)(
      (type) => materialeconsumo_entity_1.Materialeconsumo,
      (materiale) => materiale.id
    ),
    __metadata("design:type", Number),
  ],
  Attivitamateriale.prototype,
  "IdMateriale",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: false, type: "float" }),
    __metadata("design:type", Number),
  ],
  Attivitamateriale.prototype,
  "quantita",
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
  Attivitamateriale.prototype,
  "datacreazione",
  void 0
);
Attivitamateriale = __decorate([(0, typeorm_1.Entity)()], Attivitamateriale);
exports.Attivitamateriale = Attivitamateriale;
//# sourceMappingURL=attivitamateriale.entity.js.map
