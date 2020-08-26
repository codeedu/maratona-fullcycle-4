import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository } from './category.repository';

describe('CategoryRepository', () => {
  let service: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryRepository],
    }).compile();

    service = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});