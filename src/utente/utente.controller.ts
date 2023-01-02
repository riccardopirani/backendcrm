import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiTags } from "@nestjs/swagger";
import { ApiBearerAuthWithTag } from "../utils/swagger/swagger.decorator";
import { UtenteService } from "./utente.service";
import { CreateUtenteDto } from "./dto/create-utente.dto";
import { UpdateUtenteDto } from "./dto/update-utente.dto";
import { Utente, UtenteLogin } from "./entities/utente.entity";
import { Response, Request } from "express";

@ApiTags("utente")
@Controller("utente")
export class UtenteController {
  constructor(
    private readonly utenteService: UtenteService,
    private jwtservice: JwtService
  ) {}

  @Post()
  async create(@Body() dto: Utente) {
    return await this.utenteService.create(dto);
  }

  @ApiBearerAuthWithTag()
  @Get()
  async findAll(@Req() request: Request) {
    return await this.utenteService.findAll();
  }

  //The first call generate jwt token
  @Post("/login")
  async login(
    @Body() dto: UtenteLogin,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.utenteService.Login(dto);

    const jwt = await this.jwtservice.signAsync({ id: user.id });
    response.cookie("jwt", jwt, { httpOnly: true });

    response.send({
      id: user.id,
      token: jwt,
    });
  }

  @Get(":id")
  async findOne(
    @Param("id") id: string,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.utenteService.findOne(+id);
    if (!user) {
      throw new UnauthorizedException();
    }
    const jwt = await this.jwtservice.signAsync({ id: user.id });
    response.cookie("jwt", jwt, { httpOnly: true });
    response.send(user);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUtenteDto: UpdateUtenteDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.utenteService.update(+id, updateUtenteDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    const jwt = await this.jwtservice.signAsync({ id: id });
    response.cookie("jwt", jwt, { httpOnly: true });
    response.send(user);
  }

  @ApiBearerAuthWithTag()
  @Post("/changepassword")
  async updatepassword(
    @Body("id") id: string,
    @Body("password") password: string,
    @Req() request: Request
  ) {
    return await this.utenteService.updapassword(id, password);
  }

  @ApiBearerAuthWithTag()
  @Delete(":id")
  async remove(@Param("id") id: string, @Req() request: Request) {
    return this.utenteService.remove(+id);
  }

  @ApiBearerAuthWithTag()
  @Post("/updatestate")
  async updatestate(
    @Body("id") id: string,
    @Body("enable") enable: boolean,
    @Req() request: Request
  ) {
    return await this.utenteService.updatestate(id, enable);
  }
}
