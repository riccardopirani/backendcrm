import { ValidationPipe, ValidationPipeOptions } from "@nestjs/common";

export function getDefaultValidationPipe(options?: ValidationPipeOptions) {
  const defaultOptions = getDefaultValidatorOptions();
  if (!!options) {
    Object.assign(defaultOptions, options);
  }
  return new ValidationPipe(defaultOptions);
}

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

export function getDefaultValidationPipeWithSkipMissingProperties(
  options?: ValidationPipeOptions
) {
  const skipOption = { skipMissingProperties: true };
  if (!!options) {
    Object.assign(options, skipOption);
  }
  return getDefaultValidationPipe(skipOption);
}
