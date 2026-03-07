import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PrismaService } from '../prisma.service';
import { PostStatus, Platform } from '@prisma/client';

// ─── Mock PrismaService ───────────────────────────────────────────────────────
const mockPrismaService = {
    post: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
};

// ─── Shared test data ─────────────────────────────────────────────────────────
const userId = 'user-123';
const postId = 'post-abc';

const mockPost = {
    id: postId,
    userId,
    title: 'Test Post',
    description: 'A test post',
    platform: Platform.INSTAGRAM,
    status: PostStatus.DRAFT,
    scheduledFor: null,
    postedAt: null,
    contentIdeaId: null,
    captionId: null,
    contentIdea: null,
    caption: null,
    analytics: [],
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
};

// ─── Tests ────────────────────────────────────────────────────────────────────
describe('PostsService', () => {
    let service: PostsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PostsService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get<PostsService>(PostsService);
        jest.clearAllMocks();
    });

    // ── create ──────────────────────────────────────────────────────────────────
    describe('create', () => {
        it('should create and return a post', async () => {
            mockPrismaService.post.create.mockResolvedValue(mockPost);

            const dto = {
                title: 'Test Post',
                platform: Platform.INSTAGRAM,
                status: PostStatus.DRAFT,
            } as any;

            const result = await service.create(userId, dto);

            expect(mockPrismaService.post.create).toHaveBeenCalledWith({
                data: expect.objectContaining({ userId, title: 'Test Post' }),
                include: { contentIdea: true, caption: true },
            });
            expect(result).toEqual(mockPost);
        });

        it('should convert scheduledFor string to Date', async () => {
            mockPrismaService.post.create.mockResolvedValue(mockPost);

            const dto = {
                title: 'Scheduled Post',
                platform: Platform.TIKTOK,
                scheduledFor: '2026-06-01T10:00:00.000Z',
            } as any;

            await service.create(userId, dto);

            const callArg = mockPrismaService.post.create.mock.calls[0][0];
            expect(callArg.data.scheduledFor).toBeInstanceOf(Date);
        });

        it('should set scheduledFor to null when not provided', async () => {
            mockPrismaService.post.create.mockResolvedValue(mockPost);

            const dto = { title: 'No Schedule', platform: Platform.TWITTER } as any;
            await service.create(userId, dto);

            const callArg = mockPrismaService.post.create.mock.calls[0][0];
            expect(callArg.data.scheduledFor).toBeNull();
        });
    });

    // ── findAll ─────────────────────────────────────────────────────────────────
    describe('findAll', () => {
        it('should return all posts for a user', async () => {
            mockPrismaService.post.findMany.mockResolvedValue([mockPost]);

            const result = await service.findAll(userId);

            expect(mockPrismaService.post.findMany).toHaveBeenCalledWith(
                expect.objectContaining({ where: { userId } }),
            );
            expect(result).toEqual([mockPost]);
        });

        it('should filter by status when provided', async () => {
            mockPrismaService.post.findMany.mockResolvedValue([mockPost]);

            await service.findAll(userId, PostStatus.SCHEDULED);

            const callArg = mockPrismaService.post.findMany.mock.calls[0][0];
            expect(callArg.where.status).toBe(PostStatus.SCHEDULED);
        });

        it('should filter by platform when provided', async () => {
            mockPrismaService.post.findMany.mockResolvedValue([mockPost]);

            await service.findAll(userId, undefined, 'INSTAGRAM');

            const callArg = mockPrismaService.post.findMany.mock.calls[0][0];
            expect(callArg.where.platform).toBe('INSTAGRAM');
        });
    });

    // ── findOne ─────────────────────────────────────────────────────────────────
    describe('findOne', () => {
        it('should return a post when found', async () => {
            mockPrismaService.post.findFirst.mockResolvedValue(mockPost);

            const result = await service.findOne(userId, postId);

            expect(mockPrismaService.post.findFirst).toHaveBeenCalledWith(
                expect.objectContaining({ where: { id: postId, userId } }),
            );
            expect(result).toEqual(mockPost);
        });

        it('should throw NotFoundException when post is not found', async () => {
            mockPrismaService.post.findFirst.mockResolvedValue(null);

            await expect(service.findOne(userId, 'bad-id')).rejects.toThrow(
                NotFoundException,
            );
        });
    });

    // ── getCalendar ─────────────────────────────────────────────────────────────
    describe('getCalendar', () => {
        it('should return posts grouped by date', async () => {
            const scheduledPost = {
                ...mockPost,
                status: PostStatus.SCHEDULED,
                scheduledFor: new Date('2026-03-10T14:00:00.000Z'),
            };
            mockPrismaService.post.findMany.mockResolvedValue([scheduledPost]);

            const result = await service.getCalendar(userId);

            expect(result).toHaveProperty('2026-03-10');
            expect(result['2026-03-10']).toHaveLength(1);
            expect(result['2026-03-10'][0].id).toBe(postId);
        });

        it('should return an empty object when no calendar posts exist', async () => {
            mockPrismaService.post.findMany.mockResolvedValue([]);

            const result = await service.getCalendar(userId);

            expect(result).toEqual({});
        });
    });

    // ── update ──────────────────────────────────────────────────────────────────
    describe('update', () => {
        it('should update and return the post', async () => {
            const updated = { ...mockPost, title: 'Updated Title' };
            mockPrismaService.post.findFirst.mockResolvedValue(mockPost);
            mockPrismaService.post.update.mockResolvedValue(updated);

            const dto = { title: 'Updated Title' } as any;
            const result = await service.update(userId, postId, dto);

            expect(mockPrismaService.post.update).toHaveBeenCalledWith(
                expect.objectContaining({ where: { id: postId } }),
            );
            expect(result.title).toBe('Updated Title');
        });

        it('should convert scheduledFor string to Date on update', async () => {
            mockPrismaService.post.findFirst.mockResolvedValue(mockPost);
            mockPrismaService.post.update.mockResolvedValue(mockPost);

            const dto = { scheduledFor: '2026-09-01T10:00:00.000Z' } as any;
            await service.update(userId, postId, dto);

            const callArg = mockPrismaService.post.update.mock.calls[0][0];
            expect(callArg.data.scheduledFor).toBeInstanceOf(Date);
        });

        it('should throw NotFoundException if post does not belong to user', async () => {
            mockPrismaService.post.findFirst.mockResolvedValue(null);

            await expect(
                service.update('other-user', postId, {} as any),
            ).rejects.toThrow(NotFoundException);
        });
    });

    // ── remove ──────────────────────────────────────────────────────────────────
    describe('remove', () => {
        it('should delete the post and return a success message', async () => {
            mockPrismaService.post.findFirst.mockResolvedValue(mockPost);
            mockPrismaService.post.delete.mockResolvedValue(mockPost);

            const result = await service.remove(userId, postId);

            expect(mockPrismaService.post.delete).toHaveBeenCalledWith({
                where: { id: postId },
            });
            expect(result).toEqual({ message: 'Post deleted successfully' });
        });

        it('should throw NotFoundException if post does not exist', async () => {
            mockPrismaService.post.findFirst.mockResolvedValue(null);

            await expect(service.remove(userId, 'ghost-id')).rejects.toThrow(
                NotFoundException,
            );
        });
    });
});
