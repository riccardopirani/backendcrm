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
import { MaterialeconsumoService } from "./materialeconsumo.service";
import { CreateMaterialeconsumoDto } from "./dto/create-materialeconsumo.dto";
import { UpdateMaterialeconsumoDto } from "./dto/update-materialeconsumo.dto";

@ApiTags("materialeconsumo")
@Controller("materialeconsumo")
export class MaterialeconsumoController {
  constructor(
    private readonly materialeconsumoService: MaterialeconsumoService
  ) {}

  @ApiBearerAuthWithTag()
  @Post()
  async create(@Body() createMaterialeconsumoDto: CreateMaterialeconsumoDto) {
    return this.materialeconsumoService.create(createMaterialeconsumoDto);
  }

  @ApiBearerAuthWithTag()
  @Get()
  async findAll() {
    return this.materialeconsumoService.findAll();
  }

  @ApiBearerAuthWithTag()
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.materialeconsumoService.findOne(+id);
  }

  @ApiBearerAuthWithTag()
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateMaterialeconsumoDto: UpdateMaterialeconsumoDto
  ) {
    return this.materialeconsumoService.update(+id, updateMaterialeconsumoDto);
  }

  @ApiBearerAuthWithTag()
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.materialeconsumoService.remove(+id);
  }
}
