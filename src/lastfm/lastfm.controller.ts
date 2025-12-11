import {
  Controller,
  Get,
  Query,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LastfmService } from './lastfm.service';

@Controller('lastfm')
export class LastfmController {
  constructor(private readonly lastfmService: LastfmService) {}


  @UseGuards(JwtAuthGuard)
  @Get('search')
  @HttpCode(HttpStatus.OK)
  async search(
    @Query('query') query: string,
    @Query('type') type: 'artist' | 'album' | 'track' = 'track',
  ) {
    return this.lastfmService.search(query, type);
  }


  @UseGuards(JwtAuthGuard)
  @Get('artist/:name')
  async getArtist(@Param('name') name: string) {
    return this.lastfmService.getArtistInfo(name);
  }


  @UseGuards(JwtAuthGuard)
  @Get('album/:artist/:album')
  async getAlbum(
    @Param('artist') artist: string,
    @Param('album') album: string,
  ) {
    return this.lastfmService.getAlbumInfo(artist, album);
  }


  @UseGuards(JwtAuthGuard)
  @Get('track/:artist/:track')
  async getTrack(
    @Param('artist') artist: string,
    @Param('track') track: string,
  ) {
    return this.lastfmService.getTrackInfo(artist, track);
  }
}
