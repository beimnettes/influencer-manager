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
import { CaptionsService } from './captions.service';
import { CreateCaptionDto, UpdateCaptionDto } from './captions.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('captions')
@UseGuards(JwtAuthGuard)
export class CaptionsController {
    constructor(private readonly captionsService: CaptionsService) { }

    @Post()
    create(@CurrentUser() user: any, @Body() createDto: CreateCaptionDto) {
        return this.captionsService.create(user.userId, createDto);
    }

    @Get()
    findAll(
        @CurrentUser() user: any,
        @Query('platform') platform?: string,
        @Query('tone') tone?: string,
    ) {
        return this.captionsService.findAll(user.userId, platform, tone);
    }

    @Get(':id')
    findOne(@CurrentUser() user: any, @Param('id') id: string) {
        return this.captionsService.findOne(user.userId, id);
    }

    @Patch(':id')
    update(
        @CurrentUser() user: any,
        @Param('id') id: string,
        @Body() updateDto: UpdateCaptionDto,
    ) {
        return this.captionsService.update(user.userId, id, updateDto);
    }

    @Delete(':id')
    remove(@CurrentUser() user: any, @Param('id') id: string) {
        return this.captionsService.remove(user.userId, id);
    }
}
