import { ApiProperty } from "@nestjs/swagger";

export class MultipleFilesFormDataUploadDto {
  @ApiProperty({ type: "array", items: { type: "string", format: "binary" } })
  files!: any[];
}

export class SingleFileFormDataUploadDto {
  @ApiProperty({ type: "string", format: "binary" })
  file!: any;
}

export type MultipartFormDataWithFilesDtoClassType =
  | typeof MultipleFilesFormDataUploadDto
  | typeof SingleFileFormDataUploadDto;
