import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketService } from './websocket.service';
import { EsvDataSourceService } from '../esv-data-source/esv-data-source.service';
import { ServerRepository } from '../../repositories/server/server.repository';
import { MessageRepository } from '../../repositories/message/message.repository';
import { ConfigModule } from '@nestjs/config';
import KeycloakModule from 'nestjs-keycloak-admin';

describe('WebsocketService', () => {
  let service: WebsocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        KeycloakModule.registerAsync({
          useFactory: () => {
            const keycloakConfig = JSON.parse(process.env.KEYCLOAK_JSON);
            return {
              baseUrl: keycloakConfig['auth-server-url'],
              realmName: keycloakConfig['realm'],
              clientId: keycloakConfig['resource'],
              clientSecret: keycloakConfig['credentials']['secret'],
            };
          },
        }),
      ],
      providers: [
        WebsocketService,
        EsvDataSourceService,
        ServerRepository,
        MessageRepository,
      ],
    }).compile();

    service = module.get<WebsocketService>(WebsocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
