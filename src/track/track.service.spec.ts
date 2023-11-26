/* eslint-disable prettier/prettier */
/*archivo src/track/track.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';
import { NotFoundException } from '@nestjs/common';

describe('TrackService', () => {
 let service: TrackService;
 let repository: Repository<TrackEntity>;
 let tracksList: TrackEntity[];

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [TrackService],
   }).compile();

   service = module.get<TrackService>(TrackService);
   repository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
 
 
 tracksList = [];
 for (let i = 0; i < 5; i++) {
  const track: TrackEntity = await repository.save({
    nombre: "aaa",
    duracion: 5,
  });
  tracksList.push(track);
}
});

 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 it('findAll should return all tracks', async () => {
  const tracks: TrackEntity[] = await service.findAll();
  expect(tracks).not.toBeNull();
  expect(tracks).toHaveLength(tracksList.length);
});

it('findOne should return a track by id', async () => {
  const sampleTrack = tracksList[0];
  const track = await service.findOne(sampleTrack.id);
  expect(track).not.toBeNull();
  expect(track.id).toEqual(sampleTrack.id);
});

it('findOne should throw an error if track not found', async () => {
  await expect(service.findOne("-1")).rejects.toThrow(NotFoundException);
});

it('create should return a new track', async () => {
  const trackData = {
    nombre: "aaa",
    duracion: 5,
  };

  const newTrack= await service.create(trackData as any); // Usamos 'as any' temporalmente para evitar problemas de tipos
  expect(newTrack).not.toBeNull();

  const storedTrack = await repository.findOneBy({ id: newTrack.id });
  expect(storedTrack).not.toBeNull();
  expect(storedTrack.id).toEqual(newTrack.id);
});
});

/*archivo src/track/track.service.spec.ts*/