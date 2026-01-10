import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAnalyticsDto, UpdateAnalyticsDto } from './analytics.dto';

@Injectable()
export class AnalyticsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, postId: string, createDto: CreateAnalyticsDto) {
        // Verify post ownership
        const post = await this.prisma.post.findFirst({
            where: { id: postId, userId },
        });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        return this.prisma.analytics.create({
            data: {
                ...createDto,
                postId,
                userId,
            },
            include: {
                post: {
                    select: {
                        id: true,
                        title: true,
                        platform: true,
                    },
                },
            },
        });
    }

    async findByPost(userId: string, postId: string) {
        // Verify post ownership
        const post = await this.prisma.post.findFirst({
            where: { id: postId, userId },
        });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        return this.prisma.analytics.findMany({
            where: { postId },
            orderBy: { recordedAt: 'desc' },
            include: {
                post: {
                    select: {
                        id: true,
                        title: true,
                        platform: true,
                    },
                },
            },
        });
    }

    async update(userId: string, id: string, updateDto: UpdateAnalyticsDto) {
        const analytics = await this.prisma.analytics.findFirst({
            where: { id, userId },
        });

        if (!analytics) {
            throw new NotFoundException('Analytics record not found');
        }

        return this.prisma.analytics.update({
            where: { id },
            data: updateDto,
        });
    }

    async getSummary(userId: string) {
        const analytics = await this.prisma.analytics.findMany({
            where: { userId },
            include: {
                post: {
                    select: {
                        platform: true,
                        status: true,
                    },
                },
            },
        });

        const summary = {
            totalPosts: await this.prisma.post.count({ where: { userId } }),
            totalLikes: analytics.reduce((sum, a) => sum + a.likes, 0),
            totalComments: analytics.reduce((sum, a) => sum + a.comments, 0),
            totalViews: analytics.reduce((sum, a) => sum + a.views, 0),
            totalShares: analytics.reduce((sum, a) => sum + a.shares, 0),
            averageLikes: analytics.length > 0
                ? Math.round(analytics.reduce((sum, a) => sum + a.likes, 0) / analytics.length)
                : 0,
            platformBreakdown: {} as Record<string, number>,
        };

        // Platform breakdown
        analytics.forEach(a => {
            const platform = a.post.platform;
            if (!summary.platformBreakdown[platform]) {
                summary.platformBreakdown[platform] = 0;
            }
            summary.platformBreakdown[platform]++;
        });

        return summary;
    }
}
