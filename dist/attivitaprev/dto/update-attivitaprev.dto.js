"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAttivitaprevDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_attivitaprev_dto_1 = require("./create-attivitaprev.dto");
class UpdateAttivitaprevDto extends (0, mapped_types_1.PartialType)(
  create_attivitaprev_dto_1.CreateAttivitaprevDto
) {}
exports.UpdateAttivitaprevDto = UpdateAttivitaprevDto;
//# sourceMappingURL=update-attivitaprev.dto.js.map
