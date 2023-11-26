/* eslint-disable prettier/prettier */
import {IsDate, IsNotEmpty, IsString} from 'class-validator';
export class AlbumDto {

 @IsString()
 @IsNotEmpty()
 readonly nombre: string;
 
 @IsString()
 @IsNotEmpty()
 readonly caratula: string;
 
 @IsDate()
 @IsNotEmpty()
 readonly lanzamiento: Date;
 
 @IsString()
 @IsNotEmpty()
 readonly descripcion: string;
}
/* archivo: src/album/album.dto.ts */