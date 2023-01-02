import { Test, TestingModule } from "@nestjs/testing";
import { AttivitamaterialeService } from "./attivitamateriale.service";

describe("AttivitamaterialeService", () => {
  let service: AttivitamaterialeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttivitamaterialeService],
    }).compile();

    service = module.get<AttivitamaterialeService>(AttivitamaterialeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
