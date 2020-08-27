import { Test, TestingModule } from '@nestjs/testing';
import { KeycloakUserService } from './keycloak-user.service';
import { EsvDataSourceService } from '../esv-data-source/esv-data-source.service';
import { UserRepository } from '../../repositories/user/user.repository';
import { ConfigModule } from '@nestjs/config';
import KeycloakModule from 'nestjs-keycloak-admin';

describe('KeycloakUserService', () => {
  let service: KeycloakUserService;

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
      providers: [KeycloakUserService, EsvDataSourceService, UserRepository],
    }).compile();

    service = module.get<KeycloakUserService>(KeycloakUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
