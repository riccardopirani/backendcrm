import { Controller, Get, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConfigService } from "../../config/config.service";
import { ApiGatewayBaseController } from "../api-gateway/api-gateway-base.controller";
import { Request, Response } from "express";
import { ApiGatewayService } from "../api-gateway/api-gateway.service";

@ApiTags("file")
@Controller("file")
export class FileController extends ApiGatewayBaseController {
  prefix: string;
  endPointUrl: string;

  constructor(
    private configService: ConfigService,
    apiGatewayService: ApiGatewayService
  ) {
    super(apiGatewayService);
    this.prefix = "/file";
    this.endPointUrl = this.configService.appConfig.fileServiceEndPointUrl;
  }

  @Get("download/?*")
  async get(@Req() req: Request, @Res() res: Response) {
    await this.request(this.prefix, this.endPointUrl, req, res);
  }
}
