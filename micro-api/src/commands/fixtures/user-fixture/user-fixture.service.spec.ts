import { Test, TestingModule } from '@nestjs/testing';
import { UserFixtureService } from './user-fixture.service';

describe('UserFixtureService', () => {
  let service: UserFixtureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFixtureService],
    }).compile();

    service = module.get<UserFixtureService>(UserFixtureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
