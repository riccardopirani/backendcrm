import { Module } from "@nestjs/common";
import { AttivitamaterialeService } from "./attivitamateriale.service";
import { AttivitamaterialeController } from "./attivitamateriale.controller";
import { Attivitamateriale } from "./entities/attivitamateriale.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { expiresIn, jwtkey } from "src/jwtkey/jwtkey.service";
import { Materialeconsumo } from "src/materialeconsumo/entities/materialeconsumo.entity";
import { MaterialeconsumoService } from "src/materialeconsumo/materialeconsumo.service";
import { MaterialeconsumoController } from "src/materialeconsumo/materialeconsumo.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Attivitamateriale]),
    TypeOrmModule.forFeature([Materialeconsumo]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [AttivitamaterialeController, MaterialeconsumoController],
  providers: [AttivitamaterialeService, MaterialeconsumoService],
})
export class AttivitamaterialeModule {}
