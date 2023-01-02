import { Request, Response } from "express";
export declare class ApiGatewayService {
  request(
    method: string,
    url: string,
    req: Request,
    res: Response
  ): Promise<void>;
  private streamFinished;
}
