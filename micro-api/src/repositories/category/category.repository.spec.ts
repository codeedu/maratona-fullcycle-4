import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository } from './category.repository';
import { EsvDataSourceService } from '../../services/esv-data-source/esv-data-source.service';
import { ConfigModule } from '@nestjs/config';
import { sleep } from '../../utils';

describe('CategoryRepository', () => {
  let service: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [CategoryRepository, EsvDataSourceService],
    }).compile();

    service = module.get<CategoryRepository>(CategoryRepository);

    await sleep(200);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});