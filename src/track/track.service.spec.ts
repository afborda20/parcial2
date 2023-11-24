/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/*archivo src/track/track.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';

describe('TrackService', () => {
 let service: TrackService;
 let repository: Repository<TrackEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [TrackService],
   }).compile();

   service = module.get<TrackService>(TrackService);
   repository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

});

/*archivo src/track/track.service.spec.ts*/