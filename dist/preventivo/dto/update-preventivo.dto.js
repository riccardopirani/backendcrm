"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePreventivoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_preventivo_dto_1 = require("./create-preventivo.dto");
class UpdatePreventivoDto extends (0, mapped_types_1.PartialType)(
  create_preventivo_dto_1.CreatePreventivoDto
) {}
exports.UpdatePreventivoDto = UpdatePreventivoDto;
//# sourceMappingURL=update-preventivo.dto.js.map
