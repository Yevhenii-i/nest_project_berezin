import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateRatingDto } from './dto/create-rating.dto';

//POST	/ratings/song/:mbid	Rate a song (1–5 stars)
//POST	/ratings/album/:mbid	Rate an album (1–5 stars)
//GET	/ratings/song/:mbid	Get average rating for a song
//GET	/ratings/user	Get ratings submitted by the current user

@Controller('ratings')
export class RatingsController {
    constructor(private readonly ratingsService: RatingsService) {}


    @Post('song/:id')
    async rateSong(
        @Param('id') songId: string,
        @Body() dto: CreateRatingDto,
        @CurrentUser('id') userId: number,
    ) {
        return this.ratingsService.rate(userId, 'song', songId, dto.score);
    }


    @Post('album/:id')
    async rateAlbum(
        @Param('id') albumId: string,
        @Body() dto: CreateRatingDto,
        @CurrentUser('id') userId: number,
    ) {
        return this.ratingsService.rate(userId, 'album', albumId, dto.score);
    }


    @Post('artist/:id')
    async rateArtist(
        @Param('id') artistId: string,
        @Body() dto: CreateRatingDto,
        @CurrentUser('id') userId: number,
    ) {
        return this.ratingsService.rate(userId, 'artist', artistId, dto.score);
    }


    @Get(':type/:id')
    async getEntityRating(
        @Param('type') type: 'song' | 'album' | 'artist',
        @Param('id') entityId: string,
    ) {
        return this.ratingsService.getAverageRating(type, entityId);
    }


    @Get('user/me')
    async getUserRatings(@CurrentUser('id') userId: number) {
        return this.ratingsService.getUserRatings(userId);
    }

}
