import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiBearerAuthWithTag } from "../utils/swagger/swagger.decorator";
import { AttivitamaterialeService } from "./attivitamateriale.service";
import { CreateAttivitamaterialeDto } from "./dto/create-attivitamateriale.dto";
import { UpdateAttivitamaterialeDto } from "./dto/update-attivitamateriale.dto";

@ApiTags("attivitamateriale")
@Controller("attivitamateriale")
export class AttivitamaterialeController {
  constructor(private readonly service: AttivitamaterialeService) {}

  @ApiBearerAuthWithTag()
  @Post()
  async create(@Body() createAttivitamaterialeDto: CreateAttivitamaterialeDto) {
    return await this.service.create(createAttivitamaterialeDto);
  }

  @ApiBearerAuthWithTag()
  @Get("/report:id")
  async report(@Param("id") id: string) {
    return await this.service.report(+id.replace(":", ""));
  }

  @ApiBearerAuthWithTag()
  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @ApiBearerAuthWithTag()
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.service.findAll();
  }

  @ApiBearerAuthWithTag()
  @Get("/commessa/:id")
  async idcommessa(@Param("id") id: string) {
    return this.service.findbyIdCommesa(+id);
  }

  @ApiBearerAuthWithTag()
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateAttivitamaterialeDto: UpdateAttivitamaterialeDto
  ) {
    return this.service.update(+id, updateAttivitamaterialeDto);
  }

  @ApiBearerAuthWithTag()
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
