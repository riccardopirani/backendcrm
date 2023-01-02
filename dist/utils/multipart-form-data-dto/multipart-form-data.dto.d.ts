export declare class MultipleFilesFormDataUploadDto {
  files: any[];
}
export declare class SingleFileFormDataUploadDto {
  file: any;
}
export declare type MultipartFormDataWithFilesDtoClassType =
  | typeof MultipleFilesFormDataUploadDto
  | typeof SingleFileFormDataUploadDto;
