import { Test, TestingModule } from "@nestjs/testing";
import { AttivitacommessaController } from "./attivitacommessa.controller";
import { AttivitacommessaService } from "./attivitacommessa.service";

describe("AttivitacommessaController", () => {
  let controller: AttivitacommessaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttivitacommessaController],
      providers: [AttivitacommessaService],
    }).compile();

    controller = module.get<AttivitacommessaController>(
      AttivitacommessaController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
