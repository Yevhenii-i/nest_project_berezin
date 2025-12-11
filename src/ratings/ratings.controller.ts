import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateRatingDto } from './dto/create-rating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private ratingsService: RatingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':targetId')
  async rate(
    @CurrentUser() user: { id: number },
    @Param('targetId', ParseIntPipe) targetId: number,
    @Body() dto: CreateRatingDto,
  ) {
    return this.ratingsService.rate(user.id, targetId, dto.value);
  }

  @Get(':targetId')
  async getRatingsForTarget(
    @Param('targetId', ParseIntPipe) targetId: number,
  ) {
    return this.ratingsService.getRatingForTarget(targetId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':targetId/me')
  async getMyRating(
    @CurrentUser() user: { id: number },
    @Param('targetId', ParseIntPipe) targetId: number,
  ) {
    return this.ratingsService.getUserRating(user.id, targetId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':targetId')
  async deleteMyRating(
    @CurrentUser() user: { id: number },
    @Param('targetId', ParseIntPipe) targetId: number,
  ) {
    return this.ratingsService.deleteRating(user.id, targetId);
  }
}

