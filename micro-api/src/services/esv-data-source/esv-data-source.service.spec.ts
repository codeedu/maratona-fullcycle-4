import { Test, TestingModule } from '@nestjs/testing';
import { EsvDataSourceService } from './esv-data-source.service';

describe('EsvDataSourceService', () => {
  let service: EsvDataSourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EsvDataSourceService],
    }).compile();

    service = module.get<EsvDataSourceService>(EsvDataSourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
