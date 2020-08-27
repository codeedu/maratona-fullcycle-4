import { Test, TestingModule } from '@nestjs/testing';
import { EsvDataSourceService } from './esv-data-source.service';
import { ConfigModule } from '@nestjs/config';
import { sleep } from '../../utils';

describe('EsvDataSourceService', () => {
  let service: EsvDataSourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [EsvDataSourceService],
    }).compile();

    service = module.get<EsvDataSourceService>(EsvDataSourceService);

    await sleep(200);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
