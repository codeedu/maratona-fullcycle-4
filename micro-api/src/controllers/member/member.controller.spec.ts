import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from '../../repositories/user/user.repository';
import { EsvDataSourceService } from '../../services/esv-data-source/esv-data-source.service';
import { ServerRepository } from '../../repositories/server/server.repository';
import { sleep } from '../../utils';

describe('Member Controller', () => {
  let controller: MemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [MemberController],
      providers: [EsvDataSourceService,UserRepository, ServerRepository]
    }).compile();

    controller = module.get<MemberController>(MemberController);

    await sleep(200);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
