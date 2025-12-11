import { Injectable, HttpException, HttpStatus, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LastfmService {
  private readonly apiKey: string;
  private readonly apiBase: string;
  private readonly logger = new Logger(LastfmService.name);

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    const key = this.config.get<string>('LASTFM_API_KEY');
    if (!key) throw new Error('LASTFM_API_KEY is missing in environment variables');
    this.apiKey = key;

    this.apiBase = this.config.get<string>('LASTFM_API_BASE') ?? 'https://ws.audioscrobbler.com/2.0/';
  }

  private async callLastfm(params: Record<string, string>): Promise<any> {
    const url = this.apiBase;

    const query = {
      ...params,
      api_key: this.apiKey,
      format: 'json',
    };

    try {
      const response = await firstValueFrom(this.http.get(url, { params: query }));
      return response.data;
    } catch (err) {
      this.logger.error(`Last.fm API error: ${err.message}`);
      throw new HttpException(
        'Failed to fetch data from Last.fm API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }


  async search(
    query: string,
    type: 'track' | 'album' | 'artist',
  ) {
    const mapping = {
      artist: 'artist.search',
      album: 'album.search',
      track: 'track.search',
    };

    const method = mapping[type];

    const data = await this.callLastfm({
      method,
      [type]: query,
      limit: '20',
    });


    if (type === 'artist') return data?.results?.artistmatches?.artist ?? [];

    if (type === 'album') return data?.results?.albummatches?.album ?? [];
    return data?.results?.trackmatches?.track ?? [];
  }


  async getArtistInfo(name: string) {
    const data = await this.callLastfm({
      method: 'artist.getinfo',
      artist: name,
    });

    if (data.error) {
      throw new NotFoundException(data.message);
    }

    return data.artist;
  }


  async getAlbumInfo(artist: string, album: string) {
    const data = await this.callLastfm({
      method: 'album.getinfo',
      artist,
      album,
    });

    if (data.error) {
      throw new NotFoundException(data.message);
    }

    return data.album;
  }


  async getTrackInfo(artist: string, track: string) {
    const data = await this.callLastfm({
      method: 'track.getinfo',
      artist,
      track,
    });

    if (data.error) {
      throw new NotFoundException(data.message);
    }

    return data.track;
  }
}
