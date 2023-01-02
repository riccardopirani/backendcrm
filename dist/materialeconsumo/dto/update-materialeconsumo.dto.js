"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMaterialeconsumoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_materialeconsumo_dto_1 = require("./create-materialeconsumo.dto");
class UpdateMaterialeconsumoDto extends (0, swagger_1.PartialType)(
  create_materialeconsumo_dto_1.CreateMaterialeconsumoDto
) {}
exports.UpdateMaterialeconsumoDto = UpdateMaterialeconsumoDto;
//# sourceMappingURL=update-materialeconsumo.dto.js.map
