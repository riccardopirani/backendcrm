import { Test, TestingModule } from "@nestjs/testing";
import { AttivitaprevService } from "./attivitaprev.service";

describe("AttivitaprevService", () => {
  let service: AttivitaprevService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttivitaprevService],
    }).compile();

    service = module.get<AttivitaprevService>(AttivitaprevService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
