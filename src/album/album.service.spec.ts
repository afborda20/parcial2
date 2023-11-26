/* eslint-disable prettier/prettier */
/*archivo src/album/album.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';
import { faker } from "@faker-js/faker";
import { NotFoundException } from '@nestjs/common';

describe('AlbumService', () => {
 let service: AlbumService;
 let repository: Repository<AlbumEntity>;
 let albumsList: AlbumEntity[];

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [AlbumService],
   }).compile();

   service = module.get<AlbumService>(AlbumService);
   repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
 
 
 albumsList = [];
 for (let i = 0; i < 5; i++) {
  const album: AlbumEntity = await repository.save({
    nombre: "aaa",
    caratula: "imagen",
    lanzamiento: faker.date.past(),
    descripcion: faker.lorem.sentence(),
  });
  albumsList.push(album);
}
});

 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 it('findAll should return all albums', async () => {
  const albums: AlbumEntity[] = await service.findAll();
  expect(albums).not.toBeNull();
  expect(albums).toHaveLength(albumsList.length);
});

it('findOne should return a album by id', async () => {
  const sampleAlbum = albumsList[0];
  const album = await service.findOne(sampleAlbum.id);
  expect(album).not.toBeNull();
  expect(album.id).toEqual(sampleAlbum.id);
});

it('findOne should throw an error if album not found', async () => {
  await expect(service.findOne("-1")).rejects.toThrow(NotFoundException);
});

it('create should return a new album', async () => {
  const albumData = {
    nombre: "aaa",
    caratula: "imagen",
    lanzamiento: faker.date.past(),
    descripcion: faker.lorem.sentence(),
  };

  const newAlbum= await service.create(albumData as any); // Usamos 'as any' temporalmente para evitar problemas de tipos
  expect(newAlbum).not.toBeNull();

  const storedAlbum = await repository.findOneBy({ id: newAlbum.id });
  expect(storedAlbum).not.toBeNull();
  expect(storedAlbum.id).toEqual(newAlbum.id);
});

it('delete should remove a album', async () => {
  const sampleAlbum = albumsList[0];
  await service.delete(sampleAlbum.id);

  const deletedAlbum = await repository.findOneBy({ id: sampleAlbum.id });
  expect(deletedAlbum).toBeNull();
});

});

/*archivo src/album/album.service.spec.ts*/