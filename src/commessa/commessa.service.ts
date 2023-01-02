import { Injectable } from "@nestjs/common";
import { BaseService } from "../base-services/base.service";
import { ConfigService } from "../config/config.service";
import { CommessaMediaUrlResolverProcessor } from "../middleware/processors/post-processors/url_resolver/commessa-media-url-resolver.processor";
import { CreateCommessaDto } from "./dto/create-commessa.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { createQueryBuilder, getRepository, Repository } from "typeorm";
import { Commessa, CommessaRole } from "./entities/commessa.entity";
import { ExportToCsv } from "export-to-csv";
import { UpdateCommessaDto } from "./dto/update-commessa.dto";
const fs = require("fs");

@Injectable()
export class CommessaService extends BaseService<Commessa> {
  constructor(
    @InjectRepository(Commessa) private repo: Repository<Commessa>,
    private configService: ConfigService
  ) {
    super(repo, Commessa);
    this.addPostProcessor(new CommessaMediaUrlResolverProcessor(configService));
  }

  createCommessa(dto: CreateCommessaDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  async findByRagioneSociale(ragioneSociale: String) {
    return await getRepository(Commessa)
      .createQueryBuilder("commessa")
      .where("commessa.nome like :nome", { nome: `%${ragioneSociale}%` })
      .getMany();
  }

  findOne(id: number) {
    return this.getOneByIdAndRelations(+id, [
      "preventivo",
      "preventivo.gallery",
    ]);
  }

  async findbyState(state: CommessaRole, idOperatore: number) {
    var commesse = await this.repo.find({ where: { state: state } });
    var commesseload = [];

    for (var i = 0; i < commesse.length; i++) {
      if (commesse[i].IdOperatori !== null) {
        var commessatemp = commesse[i].IdOperatori.filter(
          (value) => value == idOperatore
        );
        if (commessatemp.length > 0) {
          commesseload.push(commesse[i]);
        }
      }
    }
    return commesseload;
  }

  async updateCommessa(id: string, updateCommessaDto: UpdateCommessaDto) {
    return await this.repo.update(+id, updateCommessaDto);
  }

  async loadbyIdPreventivo(IdPreventivo) {
    return await this.repo.find({ where: { IdPreventivo: IdPreventivo } });
  }

  async updateidoperatore(id, arrayvalue) {
    return await createQueryBuilder("commessa")
      .update<Commessa>(Commessa, { IdOperatori: arrayvalue })
      .where("commessa.id = :id", { id: id })
      .updateEntity(true)
      .execute();
  }

  async loadfromcommessa(id, dataInzio, dataFine) {
    return await this.repo
      .createQueryBuilder("commessa")
      .where("commessa.datacreazione > :datacreazione", {
        datacreazione: dataInzio,
      })
      .where("commessa.datachiusura > :dataFine", { dataFine: dataFine })
      .getMany();
  }

  async report(id: number, start: string, end: string) {
    try {
      var data = await this.loadfromcommessa(id, start, end);
      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "Report Attivita Preventivo",
        useTextFile: false,
        useBom: true,
      };
      const csvExporter = new ExportToCsv(options);
      const report = csvExporter.generateCsv(JSON.stringify(data), true);
      fs.writeFileSync("stampacommessa.csv", report);
      return true;
    } catch (err) {
      console.log("Errore generazione csv: " + err);
      return false;
    }
  }
}
