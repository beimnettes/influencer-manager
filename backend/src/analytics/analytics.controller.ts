import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    UseGuards,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto, UpdateAnalyticsDto } from './analytics.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Post('post/:postId')
    create(
        @CurrentUser() user: any,
        @Param('postId') postId: string,
        @Body() createDto: CreateAnalyticsDto,
    ) {
        return this.analyticsService.create(user.userId, postId, createDto);
    }

    @Get('post/:postId')
    findByPost(@CurrentUser() user: any, @Param('postId') postId: string) {
        return this.analyticsService.findByPost(user.userId, postId);
    }

    @Patch(':id')
    update(
        @CurrentUser() user: any,
        @Param('id') id: string,
        @Body() updateDto: UpdateAnalyticsDto,
    ) {
        return this.analyticsService.update(user.userId, id, updateDto);
    }

    @Get('summary')
    getSummary(@CurrentUser() user: any) {
        return this.analyticsService.getSummary(user.userId);
    }
}
