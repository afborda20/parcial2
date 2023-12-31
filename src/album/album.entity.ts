/* eslint-disable prettier/prettier */
import { PerformerEntity } from '../performer/performer.entity';
import { TrackEntity } from '../track/track.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlbumEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 caratula: string;
 
 @Column()
 lanzamiento: Date;
 
 @Column()
 descripcion: string;

 @ManyToMany(() => PerformerEntity, performer => performer.albums)
   @JoinTable()
   performers: PerformerEntity[];

@OneToMany(() => TrackEntity, track => track.album)
   tracks: TrackEntity[];
}