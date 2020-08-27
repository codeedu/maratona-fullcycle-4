import { Test, TestingModule } from '@nestjs/testing';
import { UserFixtureService } from './user-fixture.service';
import { KeycloakUserService } from '../../../services/keycloak-user/keycloak-user.service';
import { UserRepository } from '../../../repositories/user/user.repository';
import { EsvDataSourceService } from '../../../services/esv-data-source/esv-data-source.service';
import { ConfigModule } from '@nestjs/config';
import KeycloakModule from 'nestjs-keycloak-admin';

describe('UserFixtureService', () => {
  let service: UserFixtureService;

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
        EsvDataSourceService,
        UserFixtureService,
        KeycloakUserService,
        UserRepository,
      ],
    }).compile();

    service = module.get<UserFixtureService>(UserFixtureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
