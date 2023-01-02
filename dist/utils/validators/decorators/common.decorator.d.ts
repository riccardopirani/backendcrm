import { ValidationPipeOptions } from "@nestjs/common";
export declare function BodyValidated(
  options?: ValidationPipeOptions
): ParameterDecorator;
export declare function IsIsoDate(): PropertyDecorator;
export declare function IsNotEmptyString(): <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>
) => void;
export declare function IsPhoneNumberWithPrefix(): PropertyDecorator;
export declare function IsNotEmptyJson(): <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>
) => void;
export declare function IsNotEmptyStringOptional(): <
  TFunction extends Function,
  Y
>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>
) => void;
export declare function IsStringOptional(): <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>
) => void;
export declare function IsObjectOptional(): <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>
) => void;
export declare function IsNumberOptional(): <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>
) => void;
export declare function IsBooleanOptional(): <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>
) => void;
export declare function IsEmailOptional(): <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>
) => void;
export declare function IsIsoDateOptional(): <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>
) => void;
export declare function IsPhoneNumberWithPrefixOptional(): <
  TFunction extends Function,
  Y
>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>
) => void;
export declare function IsMobilePhoneOptional(): <
  TFunction extends Function,
  Y
>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>
) => void;
export declare function IsNotEmptyJsonOptional(): <
  TFunction extends Function,
  Y
>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>
) => void;
