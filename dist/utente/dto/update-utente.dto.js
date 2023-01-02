"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUtenteDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_utente_dto_1 = require("./create-utente.dto");
class UpdateUtenteDto extends (0, mapped_types_1.PartialType)(
  create_utente_dto_1.CreateUtenteDto
) {}
exports.UpdateUtenteDto = UpdateUtenteDto;
//# sourceMappingURL=update-utente.dto.js.map
