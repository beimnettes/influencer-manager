import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto, UpdatePostDto } from './posts.dto';
import { PostStatus } from '@prisma/client';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createDto: CreatePostDto) {
        return this.prisma.post.create({
            data: {
                ...createDto,
                userId,
                scheduledFor: createDto.scheduledFor ? new Date(createDto.scheduledFor) : null,
            },
            include: {
                contentIdea: true,
                caption: true,
            },
        });
    }

    async findAll(userId: string, status?: PostStatus, platform?: string) {
        const where: any = { userId };

        if (status) {
            where.status = status;
        }

        if (platform) {
            where.platform = platform;
        }

        return this.prisma.post.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                contentIdea: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                caption: {
                    select: {
                        id: true,
                        content: true,
                    },
                },
                analytics: true,
            },
        });
    }

    async findOne(userId: string, id: string) {
        const post = await this.prisma.post.findFirst({
            where: { id, userId },
            include: {
                contentIdea: true,
                caption: true,
                analytics: true,
            },
        });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        return post;
    }

    async getCalendar(userId: string) {
        const posts = await this.prisma.post.findMany({
            where: {
                userId,
                OR: [
                    { status: PostStatus.SCHEDULED },
                    { status: PostStatus.POSTED },
                ],
                scheduledFor: {
                    not: null,
                },
            },
            orderBy: { scheduledFor: 'asc' },
            include: {
                contentIdea: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                caption: {
                    select: {
                        id: true,
                        content: true,
                    },
                },
            },
        });

        // Group posts by date
        const grouped = posts.reduce((acc, post) => {
            const date = post.scheduledFor!.toISOString().split('T')[0];
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(post);
            return acc;
        }, {} as Record<string, any[]>);

        return grouped;
    }

    async update(userId: string, id: string, updateDto: UpdatePostDto) {
        await this.findOne(userId, id);

        const data: any = { ...updateDto };

        if (updateDto.scheduledFor) {
            data.scheduledFor = new Date(updateDto.scheduledFor);
        }

        if (updateDto.postedAt) {
            data.postedAt = new Date(updateDto.postedAt);
        }

        return this.prisma.post.update({
            where: { id },
            data,
            include: {
                contentIdea: true,
                caption: true,
                analytics: true,
            },
        });
    }

    async remove(userId: string, id: string) {
        await this.findOne(userId, id);

        await this.prisma.post.delete({
            where: { id },
        });

        return { message: 'Post deleted successfully' };
    }
}
