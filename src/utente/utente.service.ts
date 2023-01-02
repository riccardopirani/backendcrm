import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createQueryBuilder, Repository } from "typeorm";
import { CreateUtenteDto } from "./dto/create-utente.dto";
import { UpdateUtenteDto } from "./dto/update-utente.dto";
import { Utente, UtenteLogin } from "./entities/utente.entity";
const crypto = require("crypto");

export function encrypt(text) {
  return Buffer.from(text).toString("base64");
}
export function decrypt(text) {
  return Buffer.from(text, "base64").toString("ascii");
}

@Injectable()
export class UtenteService {
  constructor(@InjectRepository(Utente) private repo: Repository<Utente>) {}

  async create(dto: Utente) {
    if (dto.cellulare === undefined) {
      dto.cellulare = "000000000";
    }
    if (dto.telefono === undefined) {
      dto.telefono = "000000000";
    }
    dto.enable = true;
    dto.password = encrypt(dto.password);
    return this.repo.save(dto);
  }

  async Login(dto: UtenteLogin) {
    console.log("Pwd: " + encrypt(dto.password));
    return this.repo.findOne({
      username: dto.username,
      password: encrypt(dto.password),
    });
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  update(id: number, updateUtenteDto: UpdateUtenteDto) {
    return this.repo.update(id, updateUtenteDto);
  }

  remove(id: number) {
    return `This action removes a #${id} utente`;
  }

  async updapassword(id: string, password: string) {
    var paswdcrypt = encrypt(password);
    return await createQueryBuilder("utente")
      .update<Utente>(Utente, { password: paswdcrypt.toString() })
      .where("utente.id = :id", { id: id })
      .updateEntity(true)
      .execute();
  }

  async updatestate(id: string, enable: boolean) {
    return await createQueryBuilder("utente")
      .update<Utente>(Utente, { enable: enable })
      .where("utente.id = :id", { id: id })
      .updateEntity(true)
      .execute();
  }
}
