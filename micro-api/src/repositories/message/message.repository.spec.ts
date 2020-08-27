import { Test, TestingModule } from '@nestjs/testing';
import { MessageRepository } from './message.repository';
import { EsvDataSourceService } from '../../services/esv-data-source/esv-data-source.service';
import { ConfigModule } from '@nestjs/config';
import { sleep } from '../../utils';

describe('MessageRepository', () => {
  let service: MessageRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [MessageRepository, EsvDataSourceService],
    }).compile();

    service = module.get<MessageRepository>(MessageRepository);

    await sleep(200);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});