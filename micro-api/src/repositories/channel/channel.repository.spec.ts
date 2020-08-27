import { Test, TestingModule } from '@nestjs/testing';
import { ChannelRepository } from './channel.repository';
import { EsvDataSourceService } from '../../services/esv-data-source/esv-data-source.service';
import { ConfigModule } from '@nestjs/config';
import { sleep } from '../../utils';

describe('ChannelRepository', () => {
  let service: ChannelRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [ChannelRepository, EsvDataSourceService],
    }).compile();

    service = module.get<ChannelRepository>(ChannelRepository);

    await sleep(200);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
