import { Module } from "@nestjs/common";
import { AttivitaprevService } from "./attivitaprev.service";
import { AttivitaprevController } from "./attivitaprev.controller";
import { Attivitaprev } from "./entities/attivitaprev.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { expiresIn, jwtkey } from "src/jwtkey/jwtkey.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Attivitaprev]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [AttivitaprevController],
  providers: [AttivitaprevService],
})
export class AttivitaprevModule {}
