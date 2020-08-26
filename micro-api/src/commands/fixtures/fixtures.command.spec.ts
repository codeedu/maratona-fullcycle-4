import { Test, TestingModule } from '@nestjs/testing';
import { FixturesCommand } from './fixtures.command';

describe('FixturesCommand', () => {
  let service: FixturesCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FixturesCommand],
    }).compile();

    service = module.get<FixturesCommand>(FixturesCommand);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
