import { Body, Controller, Get, Param, Post, Put, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ExportToCsv } from "export-to-csv";
import { ApiBearerAuthWithTag } from "../utils/swagger/swagger.decorator";
import { CreateCommessaDto } from "./dto/create-commessa.dto";
import { CommessaService } from "./commessa.service";
import { UpdateCommessaDto } from "./dto/update-commessa.dto";
import { UtenteService } from "src/utente/utente.service";
import { Request } from "express";
import { UserRole } from "src/utente/entities/utente.entity";
import { CommessaRole } from "./entities/commessa.entity";
import { SpesecommessaService } from "src/spesecommessa/spesecommessa.service";
import { AttivitacommessaService } from "src/attivitacommessa/attivitacommessa.service";
import * as moment from "moment";

@ApiTags("commessa")
@Controller("commessa")
export class CommessaController {
  constructor(
    private readonly service: CommessaService,
    private readonly serviceutente: UtenteService,
    private readonly servicespese: SpesecommessaService,
    private readonly serviceattivita: AttivitacommessaService
  ) {}

  @ApiBearerAuthWithTag()
  @Post()
  async create(@Body() dto: CreateCommessaDto) {
    return await this.service.createCommessa(dto);
  }

  @ApiBearerAuthWithTag()
  @Post("/name")
  async delete(@Body("nome") nome: string) {
    return await this.service.findByRagioneSociale(nome);
  }

  @ApiBearerAuthWithTag()
  @Get("/search/:id")
  async search(@Param("id") id: string) {
    var user = await this.serviceutente.findOne(+id.replace(":", ""));
    var ris;
    if (user.ruolo === UserRole.OPERATOR) {
      ris = await this.service.findbyState(CommessaRole.IN_PROGRESS, user.id);
      return ris;
    } else {
      return await this.service.findAll();
    }
  }

  @ApiBearerAuthWithTag()
  @Get(":id")
  async findOne(@Param("id") id: string, @Req() request: Request) {
    return await this.service.findOne(+id);
  }

  @ApiBearerAuthWithTag()
  @Post("/update/operatori/:id")
  async updateoperatori(@Param("id") id: string, @Body() arrayvalue: number[]) {
    return await this.service.updateidoperatore(id, arrayvalue);
  }

  @ApiBearerAuthWithTag()
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCommessaDto: UpdateCommessaDto
  ) {
    return await this.service.updateCommessa(id, updateCommessaDto);
  }

  @ApiBearerAuthWithTag()
  @Post("/reportfull:id")
  async report(
    @Param("id") id: string,
    @Body("start") start: string,
    @Body("end") end: string
  ) {
    return await this.service.report(+id.replace(":", ""), start, end);
  }

  @ApiBearerAuthWithTag()
  @Post("/reportfull/data:id")
  async reportjson(
    @Param("id") id: string,
    @Body("start") start: string,
    @Body("end") end: string
  ) {
    return await this.service.loadfromcommessa(+id, start, end);
  }

  //Report commessa completo
  @ApiBearerAuthWithTag()
  @Post("/report/:id")
  async reportjsonfull(@Param("id") id: string) {
    var datafull = [{ nome: "Nome", data: "Data", totale: "Totale" }];

    try {
      var dataattivita = await this.serviceattivita.loadfromcommessa(+id);
      var dataspesa = await this.servicespese.loadbycommessa(+id);

      for (var i = 0; i < dataattivita.length; i++) {
        try {
          var obejct = {
            nome: dataattivita[i].nome,
            data: moment(dataattivita[i].datacreazione).format(
              moment.localeData("it").longDateFormat("L")
            ),
            totale: `${dataattivita[i].ore} h`,
          };
          datafull.push(obejct);
        } catch (err) {
          console.log("Errore: " + err);
        }
      }
      for (var i = 0; i < dataspesa.length; i++) {
        try {
          var obejct2 = {
            nome: dataspesa[i].nome,
            data: moment(dataspesa[i].datacreazione).format(
              moment.localeData("it").longDateFormat("L")
            ),
            totale: `${dataspesa[i].costo} €`,
          };
          datafull.push(obejct2);
        } catch (err) {
          console.log("Errore: " + err);
        }
      }
      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        useTextFile: false,
        useBom: true,
      };
      const csvExporter = new ExportToCsv(options);
      return csvExporter.generateCsv(JSON.stringify(datafull), true);
    } catch (err) {
      console.log("Errore generazione csv: " + err);
      throw err;
    }
  }
}
