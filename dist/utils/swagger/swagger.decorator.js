"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRequestBodyWithMultipleSchemasAndMultipleExamples =
  exports.ApiFormDataRequestWithFiles =
  exports.ApiOperationCustom =
  exports.ApiBearerAuthWithTag =
    void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_config_1 = require("../../config/swagger.config");
function ApiBearerAuthWithTag() {
  return (0, swagger_1.ApiBearerAuth)(swagger_config_1.AUTH_BEARER_TAG);
}
exports.ApiBearerAuthWithTag = ApiBearerAuthWithTag;
function ApiOperationCustom(apiOperationOptions) {
  if (!!apiOperationOptions.summary && !apiOperationOptions.description) {
    apiOperationOptions.description = apiOperationOptions.summary;
  }
  return (0, swagger_1.ApiOperation)(apiOperationOptions);
}
exports.ApiOperationCustom = ApiOperationCustom;
function ApiFormDataRequestWithFiles(formDataUploadDto) {
  return (0, common_1.applyDecorators)(
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({ type: formDataUploadDto })
  );
}
exports.ApiFormDataRequestWithFiles = ApiFormDataRequestWithFiles;
function ApiRequestBodyWithMultipleSchemasAndMultipleExamples(
  apiOperationOptions,
  arrayOfDtoClasses,
  arrayOfExamples
) {
  if (arrayOfDtoClasses.length < 1) {
    throw new common_1.InternalServerErrorException(
      "arrayOfDtoClasses array requires at least one object of type Function (one dto Class)!"
    );
  }
  if (arrayOfExamples.length < 1) {
    throw new common_1.InternalServerErrorException(
      "arrayOfExamples array requires at least one object of type ExampleType ({ name: string, schema: ExampleObject })!"
    );
  }
  if (!!apiOperationOptions.summary && !apiOperationOptions.description) {
    apiOperationOptions.description = apiOperationOptions.summary;
  }
  let arrayOfExtraModels = [];
  let arrayOfReferenceObjects = [];
  let examplesObject = {};
  arrayOfDtoClasses.map((obj) => {
    arrayOfExtraModels.push(obj);
    arrayOfReferenceObjects.push({ $ref: (0, swagger_1.getSchemaPath)(obj) });
  });
  arrayOfExamples.map((obj) => {
    examplesObject[obj.name] = obj.schema;
  });
  let requestBodyObject = {
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
  let apiOperationObjectWithRequestBody = {};
  apiOperationObjectWithRequestBody.requestBody = requestBodyObject;
  Object.assign(apiOperationObjectWithRequestBody, apiOperationOptions);
  return (0, common_1.applyDecorators)(
    (0, swagger_1.ApiExtraModels)(...arrayOfExtraModels),
    (0, swagger_1.ApiOperation)(apiOperationObjectWithRequestBody)
  );
}
exports.ApiRequestBodyWithMultipleSchemasAndMultipleExamples =
  ApiRequestBodyWithMultipleSchemasAndMultipleExamples;
//# sourceMappingURL=swagger.decorator.js.map
