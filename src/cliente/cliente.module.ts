import { Module } from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { ClienteController } from "./cliente.controller";
import { Cliente } from "./entities/cliente.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { expiresIn, jwtkey } from "src/jwtkey/jwtkey.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
