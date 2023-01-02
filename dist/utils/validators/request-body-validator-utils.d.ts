import { ValidationPipe, ValidationPipeOptions } from "@nestjs/common";
export declare function getDefaultValidationPipe(
  options?: ValidationPipeOptions
): ValidationPipe;
export declare function getDefaultValidationPipeWithSkipMissingProperties(
  options?: ValidationPipeOptions
): ValidationPipe;
