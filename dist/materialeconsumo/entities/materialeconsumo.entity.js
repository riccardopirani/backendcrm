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
exports.Materialeconsumo = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let Materialeconsumo = class Materialeconsumo extends typeorm_1.BaseEntity {};
__decorate(
  [(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata("design:type", Number)],
  Materialeconsumo.prototype,
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
  Materialeconsumo.prototype,
  "nome",
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
  Materialeconsumo.prototype,
  "unitamisura",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ default: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean),
  ],
  Materialeconsumo.prototype,
  "enable",
  void 0
);
Materialeconsumo = __decorate([(0, typeorm_1.Entity)()], Materialeconsumo);
exports.Materialeconsumo = Materialeconsumo;
//# sourceMappingURL=materialeconsumo.entity.js.map
