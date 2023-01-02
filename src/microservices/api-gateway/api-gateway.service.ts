import { Injectable } from "@nestjs/common";
import * as request from "request";
import { Request, Response } from "express";

@Injectable()
export class ApiGatewayService {
  public request(method: string, url: string, req: Request, res: Response) {
    const requestOptions = {
      method,
      uri: url,
      qs: req.query,
    };
    const stream = request(requestOptions);
    req.pipe(stream);
    res.contentType("application/json");
    stream.pipe(res);
    return this.streamFinished(stream);
  }

  private streamFinished(stream: NodeJS.ReadableStream) {
    return new Promise<void>((resolve, reject) => {
      stream.on("end", () => {
        resolve();
      });
      stream.on("error", () => {
        reject();
      });
    });
  }
}
