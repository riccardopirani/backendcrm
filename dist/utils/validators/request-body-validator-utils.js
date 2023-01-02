"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultValidationPipeWithSkipMissingProperties =
  exports.getDefaultValidationPipe = void 0;
const common_1 = require("@nestjs/common");
function getDefaultValidationPipe(options) {
  const defaultOptions = getDefaultValidatorOptions();
  if (!!options) {
    Object.assign(defaultOptions, options);
  }
  return new common_1.ValidationPipe(defaultOptions);
}
exports.getDefaultValidationPipe = getDefaultValidationPipe;
function getDefaultValidatorOptions() {
  return {
    whitelist: true,
    forbidNonWhitelisted: true,
    validationError: {
      target: true,
      value: true,
    },
  };
}
function getDefaultValidationPipeWithSkipMissingProperties(options) {
  const skipOption = { skipMissingProperties: true };
  if (!!options) {
    Object.assign(options, skipOption);
  }
  return getDefaultValidationPipe(skipOption);
}
exports.getDefaultValidationPipeWithSkipMissingProperties =
  getDefaultValidationPipeWithSkipMissingProperties;
//# sourceMappingURL=request-body-validator-utils.js.map
