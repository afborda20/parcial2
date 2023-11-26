/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { PerformerAlbumService } from './performer-album.service';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { PerformerEntity } from '../performer/performer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('PerformerAlbumService', () => {
  let service: PerformerAlbumService;
  let albumRepository: Repository<AlbumEntity>;
  let performerRepository: Repository<PerformerEntity>;
  let album: AlbumEntity;
  let performersList: PerformerEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PerformerAlbumService,
        {
          provide: getRepositoryToken(PerformerEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(AlbumEntity),
          useClass: Repository,
        },
      ],
      imports: [...TypeOrmTestingConfig()],
    }).compile();

    service = module.get<PerformerAlbumService>(PerformerAlbumService);
    performerRepository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));

    await performerRepository.clear();
    await albumRepository.clear();


    album = await albumRepository.save({
      nombre: 'aaa',
      caratula: 'imagen',
      lanzamiento: faker.date.past(),
      descripcion: faker.lorem.sentence(),
    });
    
    performersList = [];
    for (let i = 0; i < 5; i++) {
      const performer: PerformerEntity = await performerRepository.save({
        nombre: 'aaa',
        imagen: 'imagen',
        descripcion: faker.lorem.sentence(),
      });
      performersList.push(performer);
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addPerformerAlbum should add an performer to a album', async () => {
    const newPerformer: PerformerEntity = await performerRepository.save({
      nombre: 'aaa',
      imagen: 'imagen',
      descripcion: faker.lorem.sentence(),
    });

    const newAlbum: AlbumEntity = await albumRepository.save({
      nombre: 'aaa',
      caratula: 'imagen',
      lanzamiento: faker.date.past(),
      descripcion: faker.lorem.sentence(),
    });

    const result: AlbumEntity = await service.addPerformerAlbum(
      newAlbum.id,
      newPerformer.id,
    );

    expect(result.performers.length).toBe(1);
    expect(result.performers[0]).not.toBeNull();
    expect(result.performers[0].nombre).toBe(newPerformer.nombre);
    expect(result.performers[0].descripcion).toBe(newPerformer.descripcion);
  });
});
