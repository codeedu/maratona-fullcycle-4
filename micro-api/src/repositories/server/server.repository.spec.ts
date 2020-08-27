import { Test, TestingModule } from '@nestjs/testing';
import { ServerRepository } from './server.repository';
import { EsvDataSourceService } from '../../services/esv-data-source/esv-data-source.service';
import { ConfigModule } from '@nestjs/config';
import { sleep } from '../../utils';

describe('ServerRepository', () => {
  let service: ServerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [ServerRepository, EsvDataSourceService],
    }).compile();

    service = module.get<ServerRepository>(ServerRepository);

    await sleep(200);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});