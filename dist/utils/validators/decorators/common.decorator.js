"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNotEmptyJsonOptional =
  exports.IsMobilePhoneOptional =
  exports.IsPhoneNumberWithPrefixOptional =
  exports.IsIsoDateOptional =
  exports.IsEmailOptional =
  exports.IsBooleanOptional =
  exports.IsNumberOptional =
  exports.IsObjectOptional =
  exports.IsStringOptional =
  exports.IsNotEmptyStringOptional =
  exports.IsNotEmptyJson =
  exports.IsPhoneNumberWithPrefix =
  exports.IsNotEmptyString =
  exports.IsIsoDate =
  exports.BodyValidated =
    void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const request_body_validator_utils_1 = require("../request-body-validator-utils");
function BodyValidated(options) {
  return (0, common_1.Body)(
    (0, request_body_validator_utils_1.getDefaultValidationPipe)(options)
  );
}
exports.BodyValidated = BodyValidated;
function IsIsoDate() {
  return (0, class_validator_1.IsISO8601)(
    { strict: true },
    { message: `Invalid ISO date $value !ev` }
  );
}
exports.IsIsoDate = IsIsoDate;
function IsNotEmptyString() {
  return (0, common_1.applyDecorators)(
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)()
  );
}
exports.IsNotEmptyString = IsNotEmptyString;
function IsPhoneNumberWithPrefix() {
  return (0, class_validator_1.IsPhoneNumber)("ZZ");
}
exports.IsPhoneNumberWithPrefix = IsPhoneNumberWithPrefix;
function IsNotEmptyJson() {
  return (0, common_1.applyDecorators)(
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsJSON)()
  );
}
exports.IsNotEmptyJson = IsNotEmptyJson;
function IsNotEmptyStringOptional() {
  return (0, common_1.applyDecorators)(
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)()
  );
}
exports.IsNotEmptyStringOptional = IsNotEmptyStringOptional;
function IsStringOptional() {
  return (0, common_1.applyDecorators)(
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)()
  );
}
exports.IsStringOptional = IsStringOptional;
function IsObjectOptional() {
  return (0, common_1.applyDecorators)(
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)()
  );
}
exports.IsObjectOptional = IsObjectOptional;
function IsNumberOptional() {
  return (0, common_1.applyDecorators)(
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)()
  );
}
exports.IsNumberOptional = IsNumberOptional;
function IsBooleanOptional() {
  return (0, common_1.applyDecorators)(
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)()
  );
}
exports.IsBooleanOptional = IsBooleanOptional;
function IsEmailOptional() {
  return (0, common_1.applyDecorators)(
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)()
  );
}
exports.IsEmailOptional = IsEmailOptional;
function IsIsoDateOptional() {
  return (0, common_1.applyDecorators)(
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(
      { strict: true },
      { message: `Invalid ISO date $value !` }
    )
  );
}
exports.IsIsoDateOptional = IsIsoDateOptional;
function IsPhoneNumberWithPrefixOptional() {
  return (0, common_1.applyDecorators)(
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)("ZZ")
  );
}
exports.IsPhoneNumberWithPrefixOptional = IsPhoneNumberWithPrefixOptional;
function IsMobilePhoneOptional() {
  return (0, common_1.applyDecorators)(
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMobilePhone)()
  );
}
exports.IsMobilePhoneOptional = IsMobilePhoneOptional;
function IsNotEmptyJsonOptional() {
  return (0, common_1.applyDecorators)(
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsJSON)()
  );
}
exports.IsNotEmptyJsonOptional = IsNotEmptyJsonOptional;
//# sourceMappingURL=common.decorator.js.map
