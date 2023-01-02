import { Request, Response } from "express";
import { ApiGatewayService } from "./api-gateway.service";

export class ApiGatewayBaseController {
  constructor(private apiGatewayService: ApiGatewayService) {}

  public request(prefix: string, baseUrl: string, req: Request, res: Response) {
    const path =
      req.path.indexOf(prefix) === 0 ? req.path.slice(prefix.length) : req.path;
    return this.apiGatewayService.request(req.method, baseUrl + path, req, res);
  }
}
