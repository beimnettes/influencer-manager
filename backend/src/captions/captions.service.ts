import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCaptionDto, UpdateCaptionDto } from './captions.dto';

@Injectable()
export class CaptionsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createDto: CreateCaptionDto) {
        return this.prisma.caption.create({
            data: {
                ...createDto,
                userId,
                hashtags: createDto.hashtags || [],
            },
        });
    }

    async findAll(userId: string, platform?: string, tone?: string) {
        const where: any = { userId };

        if (platform) {
            where.platform = platform;
        }

        if (tone) {
            where.tone = tone;
        }

        return this.prisma.caption.findMany({
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
        const caption = await this.prisma.caption.findFirst({
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

        if (!caption) {
            throw new NotFoundException('Caption not found');
        }

        return caption;
    }

    async update(userId: string, id: string, updateDto: UpdateCaptionDto) {
        await this.findOne(userId, id);

        return this.prisma.caption.update({
            where: { id },
            data: updateDto,
        });
    }

    async remove(userId: string, id: string) {
        await this.findOne(userId, id);

        await this.prisma.caption.delete({
            where: { id },
        });

        return { message: 'Caption deleted successfully' };
    }
}
