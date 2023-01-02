import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRole } from "src/utente/entities/utente.entity";
import { getRepository, Repository } from "typeorm";
import { BaseService } from "../base-services/base.service";
import { ConfigService } from "../config/config.service";
import { PreventivoMediaUrlResolverProcessor } from "../middleware/processors/post-processors/url_resolver/preventivo-media-url-resolver.processor";
import { CreatePreventivoDto } from "./dto/create-preventivo.dto";
import { UpdatePreventivoDto } from "./dto/update-preventivo.dto";
import { Preventivo, PreventivoRole } from "./entities/preventivo.entity";

@Injectable()
export class PreventivoService extends BaseService<Preventivo> {
  constructor(
    @InjectRepository(Preventivo) private repo: Repository<Preventivo>,
    private configService: ConfigService
  ) {
    super(repo, Preventivo);
    this.addPostProcessor(
      new PreventivoMediaUrlResolverProcessor(configService)
    );
  }

  createPreventivo(createAmministratoreDto: CreatePreventivoDto) {
    return this.repo.save(createAmministratoreDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.getOneByIdAndRelations(id, ["gallery"]);
  }

  updatePreventivo(id: number, updatePreventivoDto: UpdatePreventivoDto) {
    return this.repo.update(+id, updatePreventivoDto);
  }

  deletePreventivo(id: number) {
    return this.repo.delete(+id);
  }

  async contapreventiviperdataperutenteprev(
    datacreazione: Date,
    dataaccettazione: Date
  ) {
    return await getRepository(Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione and preventivo.stato<:PreventivoRole",
        {
          datacreazione: datacreazione,
          dataaccettazione: dataaccettazione,
          PreventivoRole: PreventivoRole.CLOSED,
        }
      )
      .getMany();
  }

  async contapreventiviperdataperutente(
    idUtente: number,
    datacreazione: Date,
    dataaccettazione: Date
  ) {
    return await getRepository(Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.IdUtente=:IdUtente and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione ",
        {
          IdUtente: idUtente,
          datacreazione: datacreazione,
          dataaccettazione: dataaccettazione,
        }
      )
      .getMany();
  }

  //Conteggio preventivi
  async contaperutente(
    idUtente: number,
    isPreventiviVenduti: Boolean,
    datacreazione: Date,
    dataaccettazione: Date
  ) {
    if (!isPreventiviVenduti) {
      return await this.repo
        .createQueryBuilder("preventivo")
        .where(
          "preventivo.IdUtente=:IdUtente and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione ",
          {
            IdUtente: idUtente,
            datacreazione: datacreazione,
            dataaccettazione: dataaccettazione,
          }
        )
        .getCount();
    }
    if (isPreventiviVenduti) {
      return await getRepository(Preventivo)
        .createQueryBuilder("preventivo")
        .where(
          "preventivo.IdUtente=:IdUtente and preventivo.stato=:stato and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione ",
          {
            stato: PreventivoRole.CLOSED,
            IdUtente: idUtente,
            datacreazione: datacreazione,
            dataaccettazione: dataaccettazione,
          }
        )
        .getCount();
    }
  }

  //Sum of total quote of users
  async totalevendutoutente(
    idUtente: number,
    datacreazione: Date,
    dataaccettazione: Date
  ) {
    var preventivi = await getRepository(Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.IdUtente=:IdUtente  and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione",
        {
          IdUtente: idUtente,
          datacreazione: datacreazione,
          dataaccettazione: dataaccettazione,
        }
      )
      .getMany();
    var totale = 0;
    for (var i = 0; i < preventivi.length; i++) {
      totale = totale + preventivi[i].prezzoscontato;
    }
    return totale;
  }

  //Conta preventivi per sede
  async contapreventivisede(
    sede: String,
    datacreazione: Date,
    dataaccettazione: Date
  ) {
    return await getRepository(Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.sede =:sede and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione",
        {
          sede: sede,
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
        }
      )
      .getCount();
  }

  //Conta preventivi per
  async contapreventivisedevendutiglobale(
    datacreazione: Date,
    dataaccettazione: Date
  ) {
    return await getRepository(Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione and preventivo.stato=:PreventivoRole",
        {
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
          PreventivoRole: PreventivoRole.CLOSED,
        }
      )
      .getCount();
  }

  //Conta preventivi per sede con info
  async contapreventivisedevendutiinfo(
    sede: String,
    datacreazione: Date,
    dataaccettazione: Date
  ) {
    return await getRepository(Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.sede =:sede and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione and preventivo.stato=:PreventivoRole",
        {
          sede: sede,
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
          PreventivoRole: PreventivoRole.CLOSED,
        }
      )
      .getMany();
  }

  //Conta preventivi per sede
  async contapreventivisedevenduti(
    sede: String,
    datacreazione: Date,
    dataaccettazione: Date
  ) {
    return await getRepository(Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.sede =:sede and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione and preventivo.stato=:PreventivoRole",
        {
          sede: sede,
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
          PreventivoRole: PreventivoRole.CLOSED,
        }
      )
      .getCount();
  }

  async contapreventivirage(datacreazione: Date, dataaccettazione: Date) {
    return await getRepository(Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione",
        {
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
        }
      )
      .getCount();
  }
  async sommatotalevendutoglobale(datacreazione: Date, dataaccettazione: Date) {
    var lista = await getRepository(Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione and preventivo.stato=:PreventivoRole",
        {
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
          PreventivoRole: PreventivoRole.CLOSED,
        }
      )
      .getMany();
    return lista
      .filter((item) => item)
      .reduce((sum, current) => sum + current.prezzototale, 0);
  }
  //Somma dei prezzi del totale venduto
  async sommatotalevenduto(
    sede: String,
    datacreazione: Date,
    dataaccettazione: Date
  ) {
    var lista = await getRepository(Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.sede =:sede and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione and preventivo.stato=:PreventivoRole",
        {
          sede: sede,
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
          PreventivoRole: PreventivoRole.CLOSED,
        }
      )
      .getMany();
    return lista
      .filter((item) => item)
      .reduce((sum, current) => sum + current.prezzototale, 0);
  }

  async sommaprezzitotaliglobale(datacreazione: Date, dataaccettazione: Date) {
    var lista = await getRepository(Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione",
        {
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
        }
      )
      .getMany();
    return lista
      .filter((item) => item)
      .reduce((sum, current) => sum + current.prezzototale, 0);
  }
  //Somma dei prezzi totali
  async sommaprezzitotali(
    sede: String,
    datacreazione: Date,
    dataaccettazione: Date
  ) {
    var lista = await getRepository(Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.sede =:sede and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione",
        {
          sede: sede,
          dataaccettazione: dataaccettazione,
          datacreazione: datacreazione,
        }
      )
      .getMany();
    return lista
      .filter((item) => item)
      .reduce((sum, current) => sum + current.prezzoscontato, 0);
  }

  //Calcolo il totale dei preventivi per utente
  async totalepreventiviutente(
    idUtente: number,
    datacreazione: Date,
    dataaccettazione: Date
  ) {
    var preventivi = await getRepository(Preventivo)
      .createQueryBuilder("preventivo")
      .where(
        "preventivo.IdUtente=:IdUtente and preventivo.datacreazione>:datacreazione and preventivo.dataaccettazione<:dataaccettazione",
        {
          IdUtente: idUtente,
          datacreazione: datacreazione,
          dataaccettazione: dataaccettazione,
        }
      )
      .getMany();
    var totale = 0;
    for (var i = 0; i < preventivi.length; i++) {
      totale = totale + preventivi[i].prezzoscontato;
    }
    return totale;
  }

  //Aggiorna stato e dato preventivo dopo accettazione
  async confirm(
    id: number,
    idUtente: number,
    dataaccettazione: Date,
    prezzoscontato: number
  ) {
    return await getRepository(Preventivo)
      .createQueryBuilder("preventivo")
      .update<Preventivo>(Preventivo, {
        stato: PreventivoRole.CLOSED,
        IdVenditore: idUtente,
        dataaccettazione: dataaccettazione,
        prezzoscontato: prezzoscontato,
      })
      .where("preventivo.id = :id", { id: id })
      .updateEntity(true)
      .execute();
  }
  //ricerca per id del preventivo
  async searchbyid(role: UserRole, id: number) {
    //Se l'utente è amministratore controllore o commerciale carica tutti i preventivi
    if (
      role === UserRole.ADMIN ||
      role === UserRole.CONTROLLER ||
      role === UserRole.COMMERCIAL
    ) {
      return await getRepository(Preventivo)
        .createQueryBuilder("preventivo")
        .where("preventivo.stato =:stato", {
          stato: PreventivoRole.IN_PROGRESS,
        })
        .getMany();
    }
    //Se l'utente è QUOTATOR carico solo i preventivi creati da lui
    else if (role == UserRole.QUOTATOR) {
      return await getRepository(Preventivo)
        .createQueryBuilder("preventivo")
        .where("preventivo.stato =:stato and preventivo.IdUtente =:IdUtente ", {
          stato: PreventivoRole.IN_PROGRESS,
          IdUtente: id.toString(),
        })
        .getMany();
    } else {
      throw new UnauthorizedException();
    }
  }
}
