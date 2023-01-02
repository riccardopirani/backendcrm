import { applyDecorators, InternalServerErrorException } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  getSchemaPath,
} from "@nestjs/swagger";
import {
  ExampleObject,
  ExamplesObject,
  OperationObject,
  ReferenceObject,
  RequestBodyObject,
} from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { AUTH_BEARER_TAG } from "../../config/swagger.config";
import { MultipartFormDataWithFilesDtoClassType } from "../multipart-form-data-dto/multipart-form-data.dto";

export function ApiBearerAuthWithTag(): MethodDecorator & ClassDecorator {
  return ApiBearerAuth(AUTH_BEARER_TAG);
}

export function ApiOperationCustom(
  apiOperationOptions: Partial<OperationObject>
): MethodDecorator {
  if (!!apiOperationOptions!.summary && !apiOperationOptions.description) {
    apiOperationOptions.description = apiOperationOptions.summary;
  }
  return ApiOperation(apiOperationOptions);
}

export function ApiFormDataRequestWithFiles(
  formDataUploadDto: MultipartFormDataWithFilesDtoClassType
) {
  return applyDecorators(
    ApiConsumes("multipart/form-data"),
    // formDataUploadDto HAVE TO BE a class that extends MultipleFilesFormDataUploadDto or SingleFileFormDataUploadDto classes
    ApiBody({ type: formDataUploadDto })
  );
}

type ExampleType = { name: string; schema: ExampleObject };
type ApiOperationOptionsWithoutRequestBody = Omit<
  Partial<OperationObject>,
  "requestBody"
>;

export function ApiRequestBodyWithMultipleSchemasAndMultipleExamples(
  apiOperationOptions: ApiOperationOptionsWithoutRequestBody,
  arrayOfDtoClasses: Function[],
  arrayOfExamples: ExampleType[]
) {
  if (arrayOfDtoClasses.length < 1) {
    throw new InternalServerErrorException(
      "arrayOfDtoClasses array requires at least one object of type Function (one dto Class)!"
    );
  }
  if (arrayOfExamples.length < 1) {
    throw new InternalServerErrorException(
      "arrayOfExamples array requires at least one object of type ExampleType ({ name: string, schema: ExampleObject })!"
    );
  }
  if (!!apiOperationOptions!.summary && !apiOperationOptions.description) {
    apiOperationOptions.description = apiOperationOptions.summary;
  }
  let arrayOfExtraModels: Function[] = [];
  let arrayOfReferenceObjects: ReferenceObject[] = [];
  let examplesObject: ExamplesObject = {};
  arrayOfDtoClasses.map((obj) => {
    arrayOfExtraModels.push(obj);
    arrayOfReferenceObjects.push({ $ref: getSchemaPath(obj) });
  });
  arrayOfExamples.map((obj) => {
    examplesObject[obj.name] = obj.schema;
  });
  let requestBodyObject: RequestBodyObject = {
    required: true,
    content: {
      "application/json": {
        schema: {
          oneOf: arrayOfReferenceObjects,
        },
        examples: examplesObject,
      },
    },
  };

  let apiOperationObjectWithRequestBody: Partial<OperationObject> = {};
  apiOperationObjectWithRequestBody.requestBody = requestBodyObject;
  Object.assign(apiOperationObjectWithRequestBody, apiOperationOptions);
  return applyDecorators(
    ApiExtraModels(...arrayOfExtraModels),
    ApiOperation(apiOperationObjectWithRequestBody)
  );
}
