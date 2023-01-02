import { ApiProperty } from "@nestjs/swagger";
import { MultipleFilesFormDataUploadDto } from "../../utils/multipart-form-data-dto/multipart-form-data.dto";
import { IsNotEmptyJson } from "../../utils/validators/decorators/common.decorator";

export class CreateMediaDto extends MultipleFilesFormDataUploadDto {
  @ApiProperty({ example: '{"preventivo_id": 17}' })
  @IsNotEmptyJson()
  data!: string;
}
