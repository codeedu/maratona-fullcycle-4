import { Test, TestingModule } from '@nestjs/testing';
import { ChannelRepository } from './channel.repository';

describe('ChannelRepository', () => {
  let service: ChannelRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelRepository],
    }).compile();

    service = module.get<ChannelRepository>(ChannelRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
