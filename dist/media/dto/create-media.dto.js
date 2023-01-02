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
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMediaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const multipart_form_data_dto_1 = require("../../utils/multipart-form-data-dto/multipart-form-data.dto");
const common_decorator_1 = require("../../utils/validators/decorators/common.decorator");
class CreateMediaDto extends multipart_form_data_dto_1.MultipleFilesFormDataUploadDto {}
__decorate(
  [
    (0, swagger_1.ApiProperty)({ example: '{"preventivo_id": 17}' }),
    (0, common_decorator_1.IsNotEmptyJson)(),
    __metadata("design:type", String),
  ],
  CreateMediaDto.prototype,
  "data",
  void 0
);
exports.CreateMediaDto = CreateMediaDto;
//# sourceMappingURL=create-media.dto.js.map
