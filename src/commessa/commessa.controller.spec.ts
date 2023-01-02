import { Test, TestingModule } from "@nestjs/testing";
import { CommessaController } from "./commessa.controller";
import { CommessaService } from "./commessa.service";

describe("CommessaController", () => {
  let controller: CommessaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommessaController],
      providers: [CommessaService],
    }).compile();

    controller = module.get<CommessaController>(CommessaController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
