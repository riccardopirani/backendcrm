"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAttivitamaterialeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_attivitamateriale_dto_1 = require("./create-attivitamateriale.dto");
class UpdateAttivitamaterialeDto extends (0, swagger_1.PartialType)(
  create_attivitamateriale_dto_1.CreateAttivitamaterialeDto
) {}
exports.UpdateAttivitamaterialeDto = UpdateAttivitamaterialeDto;
//# sourceMappingURL=update-attivitamateriale.dto.js.map
