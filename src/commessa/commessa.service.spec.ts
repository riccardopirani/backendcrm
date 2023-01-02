import { Test, TestingModule } from "@nestjs/testing";
import { CommessaService } from "./commessa.service";

describe("CommessaService", () => {
  let service: CommessaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommessaService],
    }).compile();

    service = module.get<CommessaService>(CommessaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
