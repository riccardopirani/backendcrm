import { Test, TestingModule } from "@nestjs/testing";
import { AttivitamaterialeController } from "./attivitamateriale.controller";
import { AttivitamaterialeService } from "./attivitamateriale.service";

describe("AttivitamaterialeController", () => {
  let controller: AttivitamaterialeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttivitamaterialeController],
      providers: [AttivitamaterialeService],
    }).compile();

    controller = module.get<AttivitamaterialeController>(
      AttivitamaterialeController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
