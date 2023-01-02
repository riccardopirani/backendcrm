import {
  Controller,
  Post,
  Req,
  UseInterceptors,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import {
  ApiBearerAuthWithTag,
  ApiFormDataRequestWithFiles,
} from "../utils/swagger/swagger.decorator";
import { BodyValidated } from "../utils/validators/decorators/common.decorator";
import { CreateMediaDto } from "./dto/create-media.dto";
import { MediaService } from "./media.service";

@ApiTags("media")
@Controller("media")
export class MediaController {
  constructor(private service: MediaService, private jwtservice: JwtService) {}

  @ApiBearerAuthWithTag()
  @ApiFormDataRequestWithFiles(CreateMediaDto)
  @Post()
  @UseInterceptors(FilesInterceptor("files"))
  async create(
    @BodyValidated() body: CreateMediaDto,
    @Req() request: any
  ): Promise<any> {
    let data = JSON.parse(body.data);
    return await this.service.addMedia(data, request);
  }

  @ApiBearerAuthWithTag()
  @Delete(":id")
  @HttpCode(204)
  async delete(@Param("id") id): Promise<any> {
    await this.service.deleteMedia(id);
  }
}
