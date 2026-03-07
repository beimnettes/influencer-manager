import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostStatus, Platform } from '@prisma/client';

// ─── Mock PostsService ────────────────────────────────────────────────────────
const mockPostsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    getCalendar: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

// ─── Shared test data ─────────────────────────────────────────────────────────
const userId = 'user-123';
const postId = 'post-abc';
const currentUser = { userId };

const mockPost = {
    id: postId,
    userId,
    title: 'Test Post',
    description: 'Test description',
    platform: Platform.INSTAGRAM,
    status: PostStatus.DRAFT,
    scheduledFor: null,
    postedAt: null,
    contentIdeaId: null,
    captionId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
};

// ─── Tests ────────────────────────────────────────────────────────────────────
describe('PostsController', () => {
    let controller: PostsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PostsController],
            providers: [{ provide: PostsService, useValue: mockPostsService }],
        })
            // Skip JWT guard in unit tests
            .overrideGuard(require('../common/guards/jwt-auth.guard').JwtAuthGuard)
            .useValue({ canActivate: () => true })
            .compile();

        controller = module.get<PostsController>(PostsController);
        jest.clearAllMocks();
    });

    // ── uploadMedia ─────────────────────────────────────────────────────────────
    describe('uploadMedia', () => {
        it('should return the uploaded file URL', () => {
            const mockFile = {
                originalname: 'photo.jpg',
                filename: '1700000000000.jpg',
                mimetype: 'image/jpeg',
                size: 1024 * 100,
            } as Express.Multer.File;

            const result = controller.uploadMedia(mockFile);

            expect(result).toEqual({
                message: 'Media uploaded successfully',
                url: `/uploads/1700000000000.jpg`,
            });
        });

        it('should build the URL from file.filename', () => {
            const mockFile = {
                originalname: 'clip.mp4',
                filename: '9999999999999.mp4',
            } as Express.Multer.File;

            const result = controller.uploadMedia(mockFile);

            expect(result.url).toBe('/uploads/9999999999999.mp4');
        });
    });

    // ── create ──────────────────────────────────────────────────────────────────
    describe('create', () => {
        it('should create a post and return it', async () => {
            mockPostsService.create.mockResolvedValue(mockPost);

            const dto = {
                title: 'Test Post',
                platform: Platform.INSTAGRAM,
                status: PostStatus.DRAFT,
            } as any;

            const result = await controller.create(currentUser, dto);

            expect(mockPostsService.create).toHaveBeenCalledWith(userId, dto);
            expect(result).toEqual(mockPost);
        });
    });

    // ── findAll ─────────────────────────────────────────────────────────────────
    describe('findAll', () => {
        it('should return all posts for the user', async () => {
            mockPostsService.findAll.mockResolvedValue([mockPost]);

            const result = await controller.findAll(currentUser);

            expect(mockPostsService.findAll).toHaveBeenCalledWith(userId, undefined, undefined);
            expect(result).toEqual([mockPost]);
        });

        it('should pass status and platform filters', async () => {
            mockPostsService.findAll.mockResolvedValue([mockPost]);

            await controller.findAll(currentUser, PostStatus.SCHEDULED, 'INSTAGRAM');

            expect(mockPostsService.findAll).toHaveBeenCalledWith(
                userId,
                PostStatus.SCHEDULED,
                'INSTAGRAM',
            );
        });
    });

    // ── getCalendar ─────────────────────────────────────────────────────────────
    describe('getCalendar', () => {
        it('should return grouped calendar posts', async () => {
            const grouped = { '2026-03-10': [mockPost] };
            mockPostsService.getCalendar.mockResolvedValue(grouped);

            const result = await controller.getCalendar(currentUser);

            expect(mockPostsService.getCalendar).toHaveBeenCalledWith(userId);
            expect(result).toEqual(grouped);
        });
    });

    // ── findOne ─────────────────────────────────────────────────────────────────
    describe('findOne', () => {
        it('should return a single post', async () => {
            mockPostsService.findOne.mockResolvedValue(mockPost);

            const result = await controller.findOne(currentUser, postId);

            expect(mockPostsService.findOne).toHaveBeenCalledWith(userId, postId);
            expect(result).toEqual(mockPost);
        });
    });

    // ── update ──────────────────────────────────────────────────────────────────
    describe('update', () => {
        it('should update a post and return it', async () => {
            const updated = { ...mockPost, status: PostStatus.SCHEDULED };
            mockPostsService.update.mockResolvedValue(updated);

            const dto = { status: PostStatus.SCHEDULED } as any;
            const result = await controller.update(currentUser, postId, dto);

            expect(mockPostsService.update).toHaveBeenCalledWith(userId, postId, dto);
            expect(result.status).toBe(PostStatus.SCHEDULED);
        });
    });

    // ── remove ──────────────────────────────────────────────────────────────────
    describe('remove', () => {
        it('should delete a post and return a success message', async () => {
            mockPostsService.remove.mockResolvedValue({ message: 'Post deleted successfully' });

            const result = await controller.remove(currentUser, postId);

            expect(mockPostsService.remove).toHaveBeenCalledWith(userId, postId);
            expect(result).toEqual({ message: 'Post deleted successfully' });
        });
    });
});
