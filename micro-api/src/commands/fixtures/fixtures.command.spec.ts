import { Test, TestingModule } from '@nestjs/testing';
import { FixturesCommand } from './fixtures.command';
import { EsvDataSourceService } from '../../services/esv-data-source/esv-data-source.service';
import { ConfigModule } from '@nestjs/config';
import { sleep } from '../../utils';

describe('FixturesCommand', () => {
  let service: FixturesCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [FixturesCommand, EsvDataSourceService],
    }).compile();

    service = module.get<FixturesCommand>(FixturesCommand);

    await sleep(200);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
