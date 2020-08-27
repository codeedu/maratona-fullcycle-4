import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketService } from './websocket.service';
import { EsvDataSourceService } from '../esv-data-source/esv-data-source.service';
import { ServerRepository } from '../../repositories/server/server.repository';
import { MessageRepository } from '../../repositories/message/message.repository';
import { ConfigModule } from '@nestjs/config';
import { KeycloakService } from 'nestjs-keycloak-admin';
import { sleep } from '../../utils';

jest.mock('nestjs-keycloak-admin');

describe('WebsocketService', () => {
  let service: WebsocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
      ],
      providers: [
        WebsocketService,
        EsvDataSourceService,
        ServerRepository,
        MessageRepository,
        KeycloakService
      ],
    }).compile();

    service = module.get<WebsocketService>(WebsocketService);

    await sleep(200);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
