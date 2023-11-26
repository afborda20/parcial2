import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { PerformerService } from './performer.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { PerformerDto } from './performer.dto';
import { PerformerEntity } from './performer.entity';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('performers')
export class PerformerController {
  constructor(private readonly performerService: PerformerService) {}

  @Get()
  async findAll() {
    return await this.performerService.findAll();
  }

  @Get(':performerId')
  async findOne(@Param('performerId') performerId: string) {
    return await this.performerService.findOne(performerId);
  }

  @Post()
  async create(@Body() performerDto: PerformerDto) {
    const performer: PerformerEntity = plainToInstance(
      PerformerEntity,
      performerDto,
    );
    return await this.performerService.create(performer);
  }
}
