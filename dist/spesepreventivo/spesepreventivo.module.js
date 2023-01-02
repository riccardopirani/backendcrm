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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpesepreventivoModule = void 0;
const common_1 = require("@nestjs/common");
const spesepreventivo_service_1 = require("./spesepreventivo.service");
const spesepreventivo_controller_1 = require("./spesepreventivo.controller");
const typeorm_1 = require("@nestjs/typeorm");
const spesepreventivo_entity_1 = require("./entities/spesepreventivo.entity");
const jwtkey_service_1 = require("../jwtkey/jwtkey.service");
const jwt_1 = require("@nestjs/jwt");
let SpesepreventivoModule = class SpesepreventivoModule {};
SpesepreventivoModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        typeorm_1.TypeOrmModule.forFeature([
          spesepreventivo_entity_1.Spesepreventivo,
        ]),
        jwt_1.JwtModule.register({
          secret: jwtkey_service_1.jwtkey,
          signOptions: { expiresIn: jwtkey_service_1.expiresIn },
        }),
      ],
      controllers: [spesepreventivo_controller_1.SpesepreventivoController],
      providers: [spesepreventivo_service_1.SpesepreventivoService],
    }),
  ],
  SpesepreventivoModule
);
exports.SpesepreventivoModule = SpesepreventivoModule;
//# sourceMappingURL=spesepreventivo.module.js.map
