"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReportDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_report_dto_1 = require("./create-report.dto");
class UpdateReportDto extends (0, swagger_1.PartialType)(
  create_report_dto_1.CreateReportDto
) {}
exports.UpdateReportDto = UpdateReportDto;
//# sourceMappingURL=update-report.dto.js.map
