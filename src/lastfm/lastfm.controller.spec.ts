import { Test, TestingModule } from '@nestjs/testing';
import { LastfmController } from './lastfm.controller';

describe('LastfmController', () => {
  let controller: LastfmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LastfmController],
    }).compile();

    controller = module.get<LastfmController>(LastfmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
