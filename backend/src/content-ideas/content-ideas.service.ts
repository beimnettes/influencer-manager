import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateContentIdeaDto, UpdateContentIdeaDto } from './content-ideas.dto';

@Injectable()
export class ContentIdeasService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createDto: CreateContentIdeaDto) {
        return this.prisma.contentIdea.create({
            data: {
                ...createDto,
                userId,
                tags: createDto.tags || [],
            },
        });
    }

    async findAll(userId: string, platform?: string) {
        const where: any = { userId };

        if (platform) {
            where.platform = platform;
        }

        return this.prisma.contentIdea.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { posts: true },
                },
            },
        });
    }

    async findOne(userId: string, id: string) {
        const idea = await this.prisma.contentIdea.findFirst({
            where: { id, userId },
            include: {
                posts: {
                    select: {
                        id: true,
                        title: true,
                        status: true,
                        scheduledFor: true,
                    },
                },
            },
        });

        if (!idea) {
            throw new NotFoundException('Content idea not found');
        }

        return idea;
    }

    async update(userId: string, id: string, updateDto: UpdateContentIdeaDto) {
        // Verify ownership
        await this.findOne(userId, id);

        return this.prisma.contentIdea.update({
            where: { id },
            data: updateDto,
        });
    }

    async remove(userId: string, id: string) {
        // Verify ownership
        await this.findOne(userId, id);

        await this.prisma.contentIdea.delete({
            where: { id },
        });

        return { message: 'Content idea deleted successfully' };
    }
}
