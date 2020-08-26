import { Test, TestingModule } from '@nestjs/testing';
import { KeycloakUserService } from './keycloak-user.service';

describe('KeycloakUserService', () => {
  let service: KeycloakUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeycloakUserService],
    }).compile();

    service = module.get<KeycloakUserService>(KeycloakUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
