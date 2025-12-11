import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  async rate(userId: number, targetId: number, value: number) {
    if (value < 1 || value > 5) {
      throw new BadRequestException('Rating value must be between 1 and 5');
    }

    return this.prisma.rating.upsert({
      where: {
        userId_targetId: { userId, targetId },
      },
      update: { value },
      create: { value, userId, targetId },
    });
  }

  async getRatingForTarget(targetId: number) {
    return this.prisma.rating.findMany({
      where: { targetId },
    });
  }

  async getUserRating(userId: number, targetId: number) {
    const rating = await this.prisma.rating.findUnique({
      where: {
        userId_targetId: { userId, targetId },
      },
    });

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    return rating;
  }

  async deleteRating(userId: number, targetId: number) {
    const rating = await this.prisma.rating.findUnique({
      where: {
        userId_targetId: { userId, targetId },
      },
    });

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    return this.prisma.rating.delete({
      where: {
        userId_targetId: { userId, targetId },
      },
    });
  }
}

