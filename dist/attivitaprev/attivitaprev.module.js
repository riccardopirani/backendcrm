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
exports.AttivitaprevModule = void 0;
const common_1 = require("@nestjs/common");
const attivitaprev_service_1 = require("./attivitaprev.service");
const attivitaprev_controller_1 = require("./attivitaprev.controller");
const attivitaprev_entity_1 = require("./entities/attivitaprev.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jwtkey_service_1 = require("../jwtkey/jwtkey.service");
const jwt_1 = require("@nestjs/jwt");
let AttivitaprevModule = class AttivitaprevModule {};
AttivitaprevModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        typeorm_1.TypeOrmModule.forFeature([
          attivitaprev_entity_1.Attivitaprev,
        ]),
        jwt_1.JwtModule.register({
          secret: jwtkey_service_1.jwtkey,
          signOptions: { expiresIn: jwtkey_service_1.expiresIn },
        }),
      ],
      controllers: [attivitaprev_controller_1.AttivitaprevController],
      providers: [attivitaprev_service_1.AttivitaprevService],
    }),
  ],
  AttivitaprevModule
);
exports.AttivitaprevModule = AttivitaprevModule;
//# sourceMappingURL=attivitaprev.module.js.map
