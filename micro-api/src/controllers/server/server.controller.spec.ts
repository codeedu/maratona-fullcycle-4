import { Test, TestingModule } from '@nestjs/testing';
import { ServerController } from './server.controller';
import { EsvDataSourceService } from '../../services/esv-data-source/esv-data-source.service';
import { ServerRepository } from '../../repositories/server/server.repository';
import { ConfigModule } from '@nestjs/config';
import { sleep } from '../../utils';

describe('Server Controller', () => {
  let controller: ServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [ServerController],
      providers: [EsvDataSourceService, ServerRepository]
    }).compile();

    controller = module.get<ServerController>(ServerController);

    await sleep(200);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
