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
exports.SpesecommessaModule = void 0;
const common_1 = require("@nestjs/common");
const spesecommessa_service_1 = require("./spesecommessa.service");
const spesecommessa_controller_1 = require("./spesecommessa.controller");
const spesecommessa_entity_1 = require("./entities/spesecommessa.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jwtkey_service_1 = require("../jwtkey/jwtkey.service");
const jwt_1 = require("@nestjs/jwt");
let SpesecommessaModule = class SpesecommessaModule {};
SpesecommessaModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        typeorm_1.TypeOrmModule.forFeature([
          spesecommessa_entity_1.Spesecommessa,
        ]),
        jwt_1.JwtModule.register({
          secret: jwtkey_service_1.jwtkey,
          signOptions: { expiresIn: jwtkey_service_1.expiresIn },
        }),
      ],
      controllers: [spesecommessa_controller_1.SpesecommessaController],
      providers: [spesecommessa_service_1.SpesecommessaService],
    }),
  ],
  SpesecommessaModule
);
exports.SpesecommessaModule = SpesecommessaModule;
//# sourceMappingURL=spesecommessa.module.js.map
