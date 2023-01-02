import { Test, TestingModule } from "@nestjs/testing";
import { SpesecommessaController } from "./spesecommessa.controller";
import { SpesecommessaService } from "./spesecommessa.service";

describe("SpesecommessaController", () => {
  let controller: SpesecommessaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpesecommessaController],
      providers: [SpesecommessaService],
    }).compile();

    controller = module.get<SpesecommessaController>(SpesecommessaController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
