import { Module } from "@nestjs/common";
import { MaterialeconsumoService } from "./materialeconsumo.service";
import { MaterialeconsumoController } from "./materialeconsumo.controller";
import { Materialeconsumo } from "./entities/materialeconsumo.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { expiresIn, jwtkey } from "src/jwtkey/jwtkey.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Materialeconsumo]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [MaterialeconsumoController],
  providers: [MaterialeconsumoService],
})
export class MaterialeconsumoModule {}
