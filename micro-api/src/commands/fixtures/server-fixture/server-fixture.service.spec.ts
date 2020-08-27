import { Test, TestingModule } from '@nestjs/testing';
import { ServerFixtureService } from './server-fixture.service';
import { ServerRepository } from '../../../repositories/server/server.repository';
import { UserRepository } from '../../../repositories/user/user.repository';
import { EsvDataSourceService } from '../../../services/esv-data-source/esv-data-source.service';
import { ConfigModule } from '@nestjs/config';
import { sleep } from '../../../utils';

describe('ServerFixtureService', () => {
  let service: ServerFixtureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        EsvDataSourceService,
        ServerFixtureService,
        ServerRepository,
        UserRepository,
      ],
    }).compile();

    service = module.get<ServerFixtureService>(ServerFixtureService);

    await sleep(200);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
