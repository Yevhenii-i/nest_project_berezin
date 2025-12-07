import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LastfmController } from './lastfm/lastfm.controller';
import { RatingsController } from './ratings/ratings.controller';
import { RatingsService } from './ratings/ratings.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [],
  controllers: [AppController, LastfmController, RatingsController, AuthController],
  providers: [AppService, RatingsService],
})
export class AppModule {}
