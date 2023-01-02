import { Test, TestingModule } from "@nestjs/testing";
import { SpesepreventivoService } from "./spesepreventivo.service";

describe("SpesepreventivoService", () => {
  let service: SpesepreventivoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpesepreventivoService],
    }).compile();

    service = module.get<SpesepreventivoService>(SpesepreventivoService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
