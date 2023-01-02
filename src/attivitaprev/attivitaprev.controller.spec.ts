import { Test, TestingModule } from "@nestjs/testing";
import { AttivitaprevController } from "./attivitaprev.controller";
import { AttivitaprevService } from "./attivitaprev.service";

describe("AttivitaprevController", () => {
  let controller: AttivitaprevController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttivitaprevController],
      providers: [AttivitaprevService],
    }).compile();

    controller = module.get<AttivitaprevController>(AttivitaprevController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
