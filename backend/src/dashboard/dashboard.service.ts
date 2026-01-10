import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PostStatus } from '@prisma/client';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) { }

    async getOverview(userId: string) {
        const now = new Date();
        const sevenDaysFromNow = new Date(now);
        sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

        // Get upcoming scheduled posts (next 7 days)
        const upcomingPosts = await this.prisma.post.findMany({
            where: {
                userId,
                status: PostStatus.SCHEDULED,
                scheduledFor: {
                    gte: now,
                    lte: sevenDaysFromNow,
                },
            },
            orderBy: { scheduledFor: 'asc' },
            take: 10,
            include: {
                contentIdea: {
                    select: {
                        title: true,
                    },
                },
                caption: {
                    select: {
                        content: true,
                    },
                },
            },
        });

        // Get recent analytics (last 30 days)
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentAnalytics = await this.prisma.analytics.findMany({
            where: {
                userId,
                recordedAt: {
                    gte: thirtyDaysAgo,
                },
            },
            orderBy: { recordedAt: 'desc' },
            take: 5,
            include: {
                post: {
                    select: {
                        title: true,
                        platform: true,
                    },
                },
            },
        });

        // Get quick stats
        const totalIdeas = await this.prisma.contentIdea.count({ where: { userId } });
        const totalCaptions = await this.prisma.caption.count({ where: { userId } });
        const totalPosts = await this.prisma.post.count({ where: { userId } });
        const scheduledPosts = await this.prisma.post.count({
            where: {
                userId,
                status: PostStatus.SCHEDULED,
            },
        });
        const postedCount = await this.prisma.post.count({
            where: {
                userId,
                status: PostStatus.POSTED,
            },
        });

        // Calculate total engagement
        const allAnalytics = await this.prisma.analytics.findMany({
            where: { userId },
        });

        const totalViews = allAnalytics.reduce((sum, a) => sum + a.views, 0);
        const totalLikes = allAnalytics.reduce((sum, a) => sum + a.likes, 0);
        const totalComments = allAnalytics.reduce((sum, a) => sum + a.comments, 0);

        return {
            upcomingPosts,
            recentAnalytics,
            stats: {
                totalIdeas,
                totalCaptions,
                totalPosts,
                scheduledPosts,
                postedCount,
                totalViews,
                totalLikes,
                totalComments,
            },
        };
    }
}
