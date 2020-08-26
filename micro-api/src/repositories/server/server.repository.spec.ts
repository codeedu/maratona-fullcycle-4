import { Test, TestingModule } from '@nestjs/testing';
import { ServerRepository } from './server.repository';

describe('ServerRepository', () => {
  let service: ServerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerRepository],
    }).compile();

    service = module.get<ServerRepository>(ServerRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});