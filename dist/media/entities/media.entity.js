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
exports.Media = void 0;
const typeorm_1 = require("typeorm");
const preventivo_entity_1 = require("../../preventivo/entities/preventivo.entity");
let Media = class Media {};
__decorate(
  [(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata("design:type", Number)],
  Media.prototype,
  "id",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String),
  ],
  Media.prototype,
  "file_name",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String),
  ],
  Media.prototype,
  "file_original_name",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String),
  ],
  Media.prototype,
  "file_content_type",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", Number)],
  Media.prototype,
  "file_id",
  void 0
);
__decorate(
  [(0, typeorm_1.VersionColumn)(), __metadata("design:type", Number)],
  Media.prototype,
  "version",
  void 0
);
__decorate(
  [(0, typeorm_1.CreateDateColumn)(), __metadata("design:type", Date)],
  Media.prototype,
  "created_date",
  void 0
);
__decorate(
  [(0, typeorm_1.UpdateDateColumn)(), __metadata("design:type", Date)],
  Media.prototype,
  "updated_date",
  void 0
);
__decorate(
  [
    (0, typeorm_1.ManyToOne)((type) => preventivo_entity_1.Preventivo, {
      onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "preventivo_id" }),
    __metadata("design:type", preventivo_entity_1.Preventivo),
  ],
  Media.prototype,
  "preventivo",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number),
  ],
  Media.prototype,
  "preventivo_id",
  void 0
);
Media = __decorate([(0, typeorm_1.Entity)()], Media);
exports.Media = Media;
//# sourceMappingURL=media.entity.js.map
