import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { ServerRepository } from '../../repositories/server/server.repository';
import { CategoryRepository } from '../../repositories/category/category.repository';
import { ConfigModule } from '@nestjs/config';
import { EsvDataSourceService } from '../../services/esv-data-source/esv-data-source.service';
import { ChannelRepository } from '../../repositories/channel/channel.repository';
import { sleep } from '../../utils';

describe('Category Controller', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [CategoryController],
      providers: [EsvDataSourceService,ServerRepository, CategoryRepository, ChannelRepository]
    }).compile();

    controller = module.get<CategoryController>(CategoryController);

    await sleep(200);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
