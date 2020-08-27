import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { EsvDataSourceService } from '../../services/esv-data-source/esv-data-source.service';
import { UserRepository } from '../../repositories/user/user.repository';
import KeycloakModule from 'nestjs-keycloak-admin';
import { ConfigModule } from '@nestjs/config';
import { KeycloakUserService } from '../../services/keycloak-user/keycloak-user.service';

describe('User Controller', () => {
  let controller: UserController;

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
      controllers: [UserController],
      providers: [EsvDataSourceService, UserRepository, KeycloakUserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
