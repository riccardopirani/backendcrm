import { Test, TestingModule } from "@nestjs/testing";
import { PreventivoController } from "./preventivo.controller";
import { PreventivoService } from "./preventivo.service";

describe("PreventivoController", () => {
  let controller: PreventivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreventivoController],
      providers: [PreventivoService],
    }).compile();

    controller = module.get<PreventivoController>(PreventivoController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
