import { Test, TestingModule } from '@nestjs/testing';
import { KeycloakUserService } from './keycloak-user.service';
import { EsvDataSourceService } from '../esv-data-source/esv-data-source.service';
import { UserRepository } from '../../repositories/user/user.repository';
import { ConfigModule } from '@nestjs/config';
import { KeycloakService } from 'nestjs-keycloak-admin';
import { sleep } from '../../utils';

jest.mock('nestjs-keycloak-admin');

describe('KeycloakUserService', () => {
  let service: KeycloakUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
      ],
      providers: [KeycloakUserService, EsvDataSourceService, UserRepository, KeycloakService],
    }).compile();

    service = module.get<KeycloakUserService>(KeycloakUserService);

    await sleep(200);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
