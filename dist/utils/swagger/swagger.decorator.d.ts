import {
  ExampleObject,
  OperationObject,
} from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { MultipartFormDataWithFilesDtoClassType } from "../multipart-form-data-dto/multipart-form-data.dto";
export declare function ApiBearerAuthWithTag(): MethodDecorator &
  ClassDecorator;
export declare function ApiOperationCustom(
  apiOperationOptions: Partial<OperationObject>
): MethodDecorator;
export declare function ApiFormDataRequestWithFiles(
  formDataUploadDto: MultipartFormDataWithFilesDtoClassType
): <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>
) => void;
declare type ExampleType = {
  name: string;
  schema: ExampleObject;
};
declare type ApiOperationOptionsWithoutRequestBody = Omit<
  Partial<OperationObject>,
  "requestBody"
>;
export declare function ApiRequestBodyWithMultipleSchemasAndMultipleExamples(
  apiOperationOptions: ApiOperationOptionsWithoutRequestBody,
  arrayOfDtoClasses: Function[],
  arrayOfExamples: ExampleType[]
): <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>
) => void;
export {};
