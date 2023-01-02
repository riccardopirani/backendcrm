import { Test, TestingModule } from "@nestjs/testing";
import { MaterialeconsumoController } from "./materialeconsumo.controller";
import { MaterialeconsumoService } from "./materialeconsumo.service";

describe("MaterialeconsumoController", () => {
  let controller: MaterialeconsumoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialeconsumoController],
      providers: [MaterialeconsumoService],
    }).compile();

    controller = module.get<MaterialeconsumoController>(
      MaterialeconsumoController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
