import { Test, TestingModule } from '@nestjs/testing';
import { ServerFixtureService } from './server-fixture.service';

describe('ServerFixtureService', () => {
  let service: ServerFixtureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerFixtureService],
    }).compile();

    service = module.get<ServerFixtureService>(ServerFixtureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
