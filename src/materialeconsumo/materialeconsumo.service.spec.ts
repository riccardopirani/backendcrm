import { Test, TestingModule } from "@nestjs/testing";
import { MaterialeconsumoService } from "./materialeconsumo.service";

describe("MaterialeconsumoService", () => {
  let service: MaterialeconsumoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialeconsumoService],
    }).compile();

    service = module.get<MaterialeconsumoService>(MaterialeconsumoService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
