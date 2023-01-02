import { Test, TestingModule } from "@nestjs/testing";
import { SpesepreventivoController } from "./spesepreventivo.controller";
import { SpesepreventivoService } from "./spesepreventivo.service";

describe("SpesepreventivoController", () => {
  let controller: SpesepreventivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpesepreventivoController],
      providers: [SpesepreventivoService],
    }).compile();

    controller = module.get<SpesepreventivoController>(
      SpesepreventivoController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
