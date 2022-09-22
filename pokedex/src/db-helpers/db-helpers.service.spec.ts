import { Test, TestingModule } from '@nestjs/testing';
import { DbHelpersService } from './db-helpers.service';

describe('DbHelpersService', () => {
  let service: DbHelpersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbHelpersService],
    }).compile();

    service = module.get<DbHelpersService>(DbHelpersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
