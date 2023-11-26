/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/*archivo src/album/performer.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PerformerEntity } from './performer.entity';
import { PerformerService } from './performer.service';
import { faker } from "@faker-js/faker";
import { NotFoundException } from '@nestjs/common';

describe('PerformerService', () => {
 let service: PerformerService;
 let repository: Repository<PerformerEntity>;
 let performersList: PerformerEntity[];

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [PerformerService],
   }).compile();

   service = module.get<PerformerService>(PerformerService);
   repository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
 
 
 performersList = [];
 for (let i = 0; i < 5; i++) {
  const performer: PerformerEntity = await repository.save({
    nombre: "aaa",
    imagen: "imagen",
    descripcion: faker.lorem.sentence(),
  });
  performersList.push(performer);
}
});

 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 it('findAll should return all performers', async () => {
  const performers: PerformerEntity[] = await service.findAll();
  expect(performers).not.toBeNull();
  expect(performers).toHaveLength(performersList.length);
});

it('findOne should return a performer by id', async () => {
  const samplePerformer = performersList[0];
  const performer = await service.findOne(samplePerformer.id);
  expect(performer).not.toBeNull();
  expect(performer.id).toEqual(samplePerformer.id);
});

it('findOne should throw an error if performer not found', async () => {
  await expect(service.findOne("-1")).rejects.toThrow(NotFoundException);
});

it('create should return a new performer', async () => {
  const performerData = {
    nombre: "aaa",
    imagen: "imagen",
    descripcion: faker.lorem.sentence(),
  };

  const newPerformer= await service.create(performerData as any); // Usamos 'as any' temporalmente para evitar problemas de tipos
  expect(newPerformer).not.toBeNull();

  const storedPerformer = await repository.findOneBy({ id: newPerformer.id });
  expect(storedPerformer).not.toBeNull();
  expect(storedPerformer.id).toEqual(newPerformer.id);
});
});

/*archivo src/performer/performer.service.spec.ts*/