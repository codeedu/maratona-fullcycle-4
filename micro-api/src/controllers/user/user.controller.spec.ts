import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { EsvDataSourceService } from '../../services/esv-data-source/esv-data-source.service';
import { UserRepository } from '../../repositories/user/user.repository';
import { ConfigModule } from '@nestjs/config';
import { KeycloakUserService } from '../../services/keycloak-user/keycloak-user.service';
import { sleep } from '../../utils';
import { Injectable } from '@nestjs/common';

@Injectable()
class KeycloakService{

}

describe('User Controller', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [UserController],
      providers: [
        EsvDataSourceService,
        UserRepository,
        KeycloakUserService,
        KeycloakService
      ],
    }).compile();

    controller = module.get<UserController>(UserController);

    await sleep(200);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
