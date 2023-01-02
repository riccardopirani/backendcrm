import { JwtService } from "@nestjs/jwt";
import { CreateMediaDto } from "./dto/create-media.dto";
import { MediaService } from "./media.service";
export declare class MediaController {
  private service;
  private jwtservice;
  constructor(service: MediaService, jwtservice: JwtService);
  create(body: CreateMediaDto, request: any): Promise<any>;
  delete(id: any): Promise<any>;
}
