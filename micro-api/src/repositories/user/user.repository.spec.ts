import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { EsvDataSourceService } from '../../services/esv-data-source/esv-data-source.service';
import { ConfigModule } from '@nestjs/config';
import { sleep } from '../../utils';

describe('UserRepository', () => {
  let service: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [UserRepository, EsvDataSourceService],
    }).compile();

    service = module.get<UserRepository>(UserRepository);

    await sleep(200);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});