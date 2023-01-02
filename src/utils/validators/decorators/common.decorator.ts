import { applyDecorators, Body, ValidationPipeOptions } from "@nestjs/common";
import {
  IsBoolean,
  IsEmail,
  IsISO8601,
  IsJSON,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";
import { getDefaultValidationPipe } from "../request-body-validator-utils";

export function BodyValidated(
  options?: ValidationPipeOptions
): ParameterDecorator {
  return Body(getDefaultValidationPipe(options));
}

export function IsIsoDate(): PropertyDecorator {
  return IsISO8601(
    { strict: true },
    { message: `Invalid ISO date $value !ev` }
  );
}

export function IsNotEmptyString() {
  return applyDecorators(IsNotEmpty(), IsString());
}

export function IsPhoneNumberWithPrefix(): PropertyDecorator {
  // @ts-ignore
  return IsPhoneNumber("ZZ");
}

export function IsNotEmptyJson() {
  return applyDecorators(IsNotEmpty(), IsJSON());
}

export function IsNotEmptyStringOptional() {
  return applyDecorators(IsOptional(), IsNotEmpty(), IsString());
}

export function IsStringOptional() {
  return applyDecorators(IsOptional(), IsString());
}

export function IsObjectOptional() {
  return applyDecorators(IsOptional(), IsObject());
}

export function IsNumberOptional() {
  return applyDecorators(IsOptional(), IsNumber());
}

export function IsBooleanOptional() {
  return applyDecorators(IsOptional(), IsBoolean());
}

export function IsEmailOptional() {
  return applyDecorators(IsOptional(), IsEmail());
}

export function IsIsoDateOptional() {
  return applyDecorators(
    IsOptional(),
    IsISO8601({ strict: true }, { message: `Invalid ISO date $value !` })
  );
}

export function IsPhoneNumberWithPrefixOptional() {
  return applyDecorators(
    IsOptional(),
    // @ts-ignore
    IsPhoneNumber("ZZ")
  );
}

export function IsMobilePhoneOptional() {
  return applyDecorators(IsOptional(), IsMobilePhone());
}

export function IsNotEmptyJsonOptional() {
  return applyDecorators(IsOptional(), IsNotEmpty(), IsJSON());
}
