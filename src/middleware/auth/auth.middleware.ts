import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Utente } from "../../utente/entities/utente.entity";
import { UtenteService } from "../../utente/utente.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UtenteService
  ) {}

  async use(req: any, res: any, next: () => void) {
    try {
      const authorizationHeader = req.header("Authorization");
      const token = authorizationHeader.split(" ")[1];
      const userId = await this.jwtService.verify(token).id;
      const found: Utente = await this.userService.findOne(userId);
      if (!found || !found.enable) {
        throw new UnauthorizedException();
      }
    } catch (e) {
      throw new UnauthorizedException();
    }

    next();
  }
}
