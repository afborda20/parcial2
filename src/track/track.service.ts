import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './track.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';
//import { AlbumEntity } from 'src/album/album.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  async findAll(): Promise<TrackEntity[]> {
    return await this.trackRepository.find({
      relations: ['album'],
    });
  }

  async findOne(id: string): Promise<TrackEntity> {
    const track: TrackEntity = await this.trackRepository.findOne({
      where: { id },
      relations: ['album'],
    });
    if (!track)
      throw new BusinessLogicException(
        'The album with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return track;
  }

  // eslint-disable-next-line prettier/prettier
  async create(track: TrackEntity /*, album: AlbumEntity */ ): Promise<TrackEntity> {
    if (track.duracion < 0) {
      throw new BusinessLogicException(
        'The track has negative duration',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    /* if (!album) {
      throw new BusinessLogicException(
        'The album dosnt exist',
        BusinessError.PRECONDITION_FAILED,
      );
    } */
    return await this.trackRepository.save(track);
  }
}
