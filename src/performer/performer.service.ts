import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PerformerEntity } from './performer.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class PerformerService {
  constructor(
    @InjectRepository(PerformerEntity)
    private readonly performerRepository: Repository<PerformerEntity>,
  ) {}

  async findAll(): Promise<PerformerEntity[]> {
    return await this.performerRepository.find({
      relations: ['albums'],
    });
  }

  async findOne(id: string): Promise<PerformerEntity> {
    const performer: PerformerEntity = await this.performerRepository.findOne({
      where: { id },
      relations: ['albums'],
    });
    if (!performer) throw new NotFoundException('Performer not found');

    return performer;
  }

  async create(performer: PerformerEntity): Promise<PerformerEntity> {
    if (performer.descripcion.length > 100) {
      throw new BusinessLogicException(
        'The description is too long',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.performerRepository.save(performer);
  }
}
