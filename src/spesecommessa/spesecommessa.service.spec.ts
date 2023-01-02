import { Test, TestingModule } from "@nestjs/testing";
import { SpesecommessaService } from "./spesecommessa.service";

describe("SpesecommessaService", () => {
  let service: SpesecommessaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpesecommessaService],
    }).compile();

    service = module.get<SpesecommessaService>(SpesecommessaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
