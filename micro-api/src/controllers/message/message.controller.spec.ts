import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { ConfigModule } from '@nestjs/config';
import { EsvDataSourceService } from '../../services/esv-data-source/esv-data-source.service';
import { MessageRepository } from '../../repositories/message/message.repository';
import { ChannelRepository } from '../../repositories/channel/channel.repository';
import { sleep } from '../../utils';

describe('Message Controller', () => {
  let controller: MessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [MessageController],
      providers: [EsvDataSourceService, MessageRepository, ChannelRepository]
    }).compile();

    controller = module.get<MessageController>(MessageController);

    await sleep(200);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
