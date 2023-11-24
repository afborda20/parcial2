/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/*archivo src/performer/performer.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PerformerEntity } from './performer.entity';
import { PerformerService } from './performer.service';

describe('PerformerService', () => {
 let service: PerformerService;
 let repository: Repository<PerformerEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [PerformerService],
   }).compile();

   service = module.get<PerformerService>(PerformerService);
   repository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

});

/*archivo src/performer/performer.service.spec.ts*/