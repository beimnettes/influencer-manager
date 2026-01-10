import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './posts.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { PostStatus } from '@prisma/client';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    create(@CurrentUser() user: any, @Body() createDto: CreatePostDto) {
        return this.postsService.create(user.userId, createDto);
    }

    @Get()
    findAll(
        @CurrentUser() user: any,
        @Query('status') status?: PostStatus,
        @Query('platform') platform?: string,
    ) {
        return this.postsService.findAll(user.userId, status, platform);
    }

    @Get('calendar')
    getCalendar(@CurrentUser() user: any) {
        return this.postsService.getCalendar(user.userId);
    }

    @Get(':id')
    findOne(@CurrentUser() user: any, @Param('id') id: string) {
        return this.postsService.findOne(user.userId, id);
    }

    @Patch(':id')
    update(
        @CurrentUser() user: any,
        @Param('id') id: string,
        @Body() updateDto: UpdatePostDto,
    ) {
        return this.postsService.update(user.userId, id, updateDto);
    }

    @Delete(':id')
    remove(@CurrentUser() user: any, @Param('id') id: string) {
        return this.postsService.remove(user.userId, id);
    }
}
