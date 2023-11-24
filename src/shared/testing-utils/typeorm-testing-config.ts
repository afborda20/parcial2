/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/album.entity';
import { PerformerEntity } from 'src/performer/performer.entity';
import { TrackEntity } from 'src/track/track.entity';



export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [AlbumEntity, PerformerEntity, TrackEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([AlbumEntity, PerformerEntity, TrackEntity]),
];
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/