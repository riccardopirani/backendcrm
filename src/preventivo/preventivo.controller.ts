import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  NotAcceptableException,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiBearerAuthWithTag } from "../utils/swagger/swagger.decorator";
import { PreventivoService } from "./preventivo.service";
import { CreatePreventivoDto } from "./dto/create-preventivo.dto";
import { UpdatePreventivoDto } from "./dto/update-preventivo.dto";
import { UtenteService } from "src/utente/utente.service";
import { UserRole } from "src/utente/entities/utente.entity";
import { AttivitaprevService } from "src/attivitaprev/attivitaprev.service";
import { SpesepreventivoService } from "src/spesepreventivo/spesepreventivo.service";

@ApiTags("preventivo")
@Controller("preventivo")
export class PreventivoController {
  constructor(
    private readonly service: PreventivoService,
    private readonly utenteservice: UtenteService,
    private readonly attivitaservice: AttivitaprevService,
    private readonly spesaservice: SpesepreventivoService
  ) {}

  @ApiBearerAuthWithTag()
  @Post()
  async create(@Body() createPreventivoDto: CreatePreventivoDto) {
    return await this.service.createPreventivo(createPreventivoDto);
  }

  @ApiBearerAuthWithTag()
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updatePreventivoDto: UpdatePreventivoDto
  ) {
    return await this.service.updatePreventivo(+id, updatePreventivoDto);
  }

  @ApiBearerAuthWithTag()
  @Put("confirm/:id")
  async confirm(
    @Param("id") id: number,
    @Body("dataaccettazione") dataaccettazione: Date,
    @Body("IdVenditore") idUtente: number
  ) {
    if (!dataaccettazione || !id || !idUtente) {
      throw new NotAcceptableException();
    }
    //Recupero l'utente per andare a verifica il tipo
    var utente = await this.utenteservice.findOne(idUtente);
    var preventivo = await this.service.findOne(+id);
    if (!preventivo.prezzoscontato) {
      preventivo.prezzoscontato = preventivo.prezzototale;
    }
    //se l'utente è amministratore controllore o commerciale eseguo l'agggiornamento altrementi no
    if (
      utente.ruolo === UserRole.ADMIN ||
      utente.ruolo === UserRole.CONTROLLER ||
      utente.ruolo === UserRole.COMMERCIAL
    ) {
      //Verifico che sia presenti attivita o spesa prima di modificare lo stato del preventivo
      if (
        (await this.attivitaservice.loadfrompreventivo(+id)).length > 0 ||
        (await this.spesaservice.loadfrompreventivo(+id)).length > 0
      ) {
        //Verifico che la data di accettazione e il prezzo totale siano inizializzati
        if (
          preventivo.dataconsegna != null &&
          preventivo.prezzototale != null
        ) {
          return await this.service.confirm(
            id,
            idUtente,
            dataaccettazione,
            preventivo.prezzoscontato
          );
        } else {
          throw new NotAcceptableException();
        }
      } else {
        throw new NotAcceptableException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  @ApiBearerAuthWithTag()
  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @ApiBearerAuthWithTag()
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.service.findOne(+id);
  }

  @ApiBearerAuthWithTag()
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.service.deletePreventivo(+id);
  }

  @ApiBearerAuthWithTag()
  @Get("/search/:id")
  async searchbyid(@Param("id") id: string) {
    var utente = await this.utenteservice.findOne(+id);
    return await this.service.searchbyid(utente.ruolo, +id);
  }
}
