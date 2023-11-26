import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './track.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

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
      throw new NotFoundException('The album with the given id was not found');

    return track;
  }

  // eslint-disable-next-line prettier/prettier
  async create(track: TrackEntity ): Promise<TrackEntity> {
    if (track.duracion < 0) {
      throw new BusinessLogicException(
        'The track has negative duration',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.trackRepository.save(track);
  }
}
