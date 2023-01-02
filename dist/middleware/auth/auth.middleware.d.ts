import { NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UtenteService } from "../../utente/utente.service";
export declare class AuthMiddleware implements NestMiddleware {
  private readonly jwtService;
  private readonly userService;
  constructor(jwtService: JwtService, userService: UtenteService);
  use(req: any, res: any, next: () => void): Promise<void>;
}
