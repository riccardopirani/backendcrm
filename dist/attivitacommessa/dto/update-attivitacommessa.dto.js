"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAttivitacommessaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_attivitacommessa_dto_1 = require("./create-attivitacommessa.dto");
class UpdateAttivitacommessaDto extends (0, mapped_types_1.PartialType)(
  create_attivitacommessa_dto_1.CreateAttivitacommessaDto
) {}
exports.UpdateAttivitacommessaDto = UpdateAttivitacommessaDto;
//# sourceMappingURL=update-attivitacommessa.dto.js.map
