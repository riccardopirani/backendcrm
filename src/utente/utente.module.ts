import { Module } from "@nestjs/common";
import { UtenteService } from "./utente.service";
import { UtenteController } from "./utente.controller";
import { Utente } from "./entities/utente.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtkey, expiresIn } from "src/jwtkey/jwtkey.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Utente]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [UtenteController],
  providers: [UtenteService],
  exports: [UtenteService],
})
export class UtenteModule {}
