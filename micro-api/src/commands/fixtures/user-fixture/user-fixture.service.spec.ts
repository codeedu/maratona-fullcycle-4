import { Test, TestingModule } from '@nestjs/testing';
import { UserFixtureService } from './user-fixture.service';
import { KeycloakUserService } from '../../../services/keycloak-user/keycloak-user.service';
import { UserRepository } from '../../../repositories/user/user.repository';
import { EsvDataSourceService } from '../../../services/esv-data-source/esv-data-source.service';
import { ConfigModule } from '@nestjs/config';
import { KeycloakService } from 'nestjs-keycloak-admin';
import { sleep } from '../../../utils';

jest.mock('nestjs-keycloak-admin');

describe('UserFixtureService', () => {
  let service: UserFixtureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
      ],
      providers: [
        EsvDataSourceService,
        UserFixtureService,
        KeycloakUserService,
        KeycloakService,
        UserRepository,
      ],
    }).compile();

    service = module.get<UserFixtureService>(UserFixtureService);

    await sleep(200);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
