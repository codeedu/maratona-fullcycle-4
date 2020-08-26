import { Test, TestingModule } from '@nestjs/testing';
import { MessageRepository } from './message.repository';

describe('MessageRepository', () => {
  let service: MessageRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageRepository],
    }).compile();

    service = module.get<MessageRepository>(MessageRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
