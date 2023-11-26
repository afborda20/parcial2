/* eslint-disable prettier/prettier */
import { Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PerformerAlbumService } from './performer-album.service';

@Controller('albums')
@UseInterceptors(BusinessErrorsInterceptor)
export class PerformerAlbumController {
   constructor(private readonly albumPerformerService: PerformerAlbumService){}

   @Post(':albumId/performers/:performerId')
   async addPerformerAlbum(@Param('albumId') albumId: string, @Param('performerId') performerId: string){
       return await this.albumPerformerService.addPerformerAlbum(albumId, performerId);
   }
}