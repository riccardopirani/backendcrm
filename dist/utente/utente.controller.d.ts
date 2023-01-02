import { JwtService } from "@nestjs/jwt";
import { UtenteService } from "./utente.service";
import { UpdateUtenteDto } from "./dto/update-utente.dto";
import { Utente, UtenteLogin } from "./entities/utente.entity";
import { Response, Request } from "express";
export declare class UtenteController {
  private readonly utenteService;
  private jwtservice;
  constructor(utenteService: UtenteService, jwtservice: JwtService);
  create(dto: Utente): Promise<Utente>;
  findAll(request: Request): Promise<Utente[]>;
  login(dto: UtenteLogin, response: Response): Promise<void>;
  findOne(id: string, response: Response): Promise<void>;
  update(
    id: string,
    updateUtenteDto: UpdateUtenteDto,
    response: Response
  ): Promise<void>;
  updatepassword(
    id: string,
    password: string,
    request: Request
  ): Promise<import("typeorm").UpdateResult>;
  remove(id: string, request: Request): Promise<string>;
  updatestate(
    id: string,
    enable: boolean,
    request: Request
  ): Promise<import("typeorm").UpdateResult>;
}
