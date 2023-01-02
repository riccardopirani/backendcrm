import { Request, Response } from "express";
import { ApiGatewayService } from "./api-gateway.service";
export declare class ApiGatewayBaseController {
  private apiGatewayService;
  constructor(apiGatewayService: ApiGatewayService);
  request(
    prefix: string,
    baseUrl: string,
    req: Request,
    res: Response
  ): Promise<void>;
}
