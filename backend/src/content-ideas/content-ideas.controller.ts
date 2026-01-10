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
import { ContentIdeasService } from './content-ideas.service';
import { CreateContentIdeaDto, UpdateContentIdeaDto } from './content-ideas.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('content-ideas')
@UseGuards(JwtAuthGuard)
export class ContentIdeasController {
    constructor(private readonly contentIdeasService: ContentIdeasService) { }

    @Post()
    create(@CurrentUser() user: any, @Body() createDto: CreateContentIdeaDto) {
        return this.contentIdeasService.create(user.userId, createDto);
    }

    @Get()
    findAll(@CurrentUser() user: any, @Query('platform') platform?: string) {
        return this.contentIdeasService.findAll(user.userId, platform);
    }

    @Get(':id')
    findOne(@CurrentUser() user: any, @Param('id') id: string) {
        return this.contentIdeasService.findOne(user.userId, id);
    }

    @Patch(':id')
    update(
        @CurrentUser() user: any,
        @Param('id') id: string,
        @Body() updateDto: UpdateContentIdeaDto,
    ) {
        return this.contentIdeasService.update(user.userId, id, updateDto);
    }

    @Delete(':id')
    remove(@CurrentUser() user: any, @Param('id') id: string) {
        return this.contentIdeasService.remove(user.userId, id);
    }
}
