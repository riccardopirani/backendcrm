import { ConfigService } from "../../config/config.service";
import { ApiGatewayBaseController } from "../api-gateway/api-gateway-base.controller";
import { Request, Response } from "express";
import { ApiGatewayService } from "../api-gateway/api-gateway.service";
export declare class FileController extends ApiGatewayBaseController {
  private configService;
  prefix: string;
  endPointUrl: string;
  constructor(
    configService: ConfigService,
    apiGatewayService: ApiGatewayService
  );
  get(req: Request, res: Response): Promise<void>;
}
