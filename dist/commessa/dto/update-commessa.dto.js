"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCommessaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_commessa_dto_1 = require("./create-commessa.dto");
class UpdateCommessaDto extends (0, mapped_types_1.PartialType)(
  create_commessa_dto_1.CreateCommessaDto
) {}
exports.UpdateCommessaDto = UpdateCommessaDto;
//# sourceMappingURL=update-commessa.dto.js.map
