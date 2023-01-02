"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSpesecommessaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_spesecommessa_dto_1 = require("./create-spesecommessa.dto");
class UpdateSpesecommessaDto extends (0, mapped_types_1.PartialType)(
  create_spesecommessa_dto_1.CreateSpesecommessaDto
) {}
exports.UpdateSpesecommessaDto = UpdateSpesecommessaDto;
//# sourceMappingURL=update-spesecommessa.dto.js.map
