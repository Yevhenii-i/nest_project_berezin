import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class RatingsService {
    constructor(private prisma: PrismaService) {}

    async rate(
        userId: number,
        entityType: 'song' | 'album' | 'artist',
        entityId: string,
        score: number,
    ) {
        return this.prisma.rating.upsert({
            where: {
                userId_entityId_entityType: {
                    userId,
                    entityId,
                    entityType,
                },
            },
            update: { score },
            create: { userId, entityType, entityId, score },
        });
    }

    async getAverageRating(
        entityType: 'song' | 'album' | 'artist',
        entityId: string,
    ) {
        const result = await this.prisma.rating.aggregate({
            where: { entityType, entityId },
            _avg: { score: true },
            _count: { score: true },
        });

        return {
            entityType,
            entityId,
            average: result._avg.score ?? 0,
            votes: result._count.score,
        };
    }

    async getUserRatings(userId: number) {
        return this.prisma.rating.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

}
