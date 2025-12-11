import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LastfmService } from './lastfm.service';
import { LastfmController } from './lastfm.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [LastfmController],
  providers: [LastfmService],
  exports: [LastfmService],
})
export class LastfmModule {}
