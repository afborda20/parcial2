/*archivo src/album-performer/album-performer.module.ts*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../album/album.entity';
import { AlbumService } from '../album/album.service';
import { PerformerAlbumController } from './performer-album.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  providers: [AlbumService],
  controllers: [PerformerAlbumController],
})
export class PerformerAlbumModule {}
