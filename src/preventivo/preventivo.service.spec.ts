import { Test, TestingModule } from "@nestjs/testing";
import { PreventivoService } from "./preventivo.service";

describe("PreventivoService", () => {
  let service: PreventivoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreventivoService],
    }).compile();

    service = module.get<PreventivoService>(PreventivoService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
