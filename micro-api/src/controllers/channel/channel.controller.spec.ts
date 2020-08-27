import { Test, TestingModule } from '@nestjs/testing';
import { ChannelController } from './channel.controller';
import { ChannelRepository } from '../../repositories/channel/channel.repository';
import { EsvDataSourceService } from '../../services/esv-data-source/esv-data-source.service';
import { ConfigModule } from '@nestjs/config';
import { CategoryRepository } from '../../repositories/category/category.repository';
import { sleep } from '../../utils';

describe('Channel Controller', () => {
  let controller: ChannelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [ChannelController],
      providers: [
        EsvDataSourceService,
        ChannelRepository,
        CategoryRepository,
        EsvDataSourceService,
      ],
    }).compile();

    controller = module.get<ChannelController>(ChannelController);

    await sleep(200);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
