import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find({
      relations: ['tracks', 'performers'],
    });
  }

  async findOne(id: string): Promise<AlbumEntity> {
    const album: AlbumEntity = await this.albumRepository.findOne({
      where: { id },
      relations: ['tracks', 'performers'],
    });
    if (!album) throw new NotFoundException('Album not found');

    return album;
  }

  async create(album: AlbumEntity): Promise<AlbumEntity> {
    if (album.nombre === '') {
      throw new BusinessLogicException(
        'The album has no name',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    if (album.descripcion === '') {
      throw new BusinessLogicException(
        'The album has no description',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.albumRepository.save(album);
  }

  async delete(id: string) {
    const album: AlbumEntity = await this.albumRepository.findOne({
      where: { id },
    });
    if (!album)
      throw new BusinessLogicException(
        'The album with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    if (album.tracks?.length > 0)
      throw new BusinessLogicException(
        'The album has tracks',
        BusinessError.PRECONDITION_FAILED,
      );
    await this.albumRepository.remove(album);
  }
}
