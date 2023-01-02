import { Test, TestingModule } from "@nestjs/testing";
import { AttivitacommessaService } from "./attivitacommessa.service";

describe("AttivitacommessaService", () => {
  let service: AttivitacommessaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttivitacommessaService],
    }).compile();

    service = module.get<AttivitacommessaService>(AttivitacommessaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
