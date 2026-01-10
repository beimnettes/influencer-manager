import { Module } from '@nestjs/common';
import { ContentIdeasService } from './content-ideas.service';
import { ContentIdeasController } from './content-ideas.controller';
import { PrismaService } from '../prisma.service';

@Module({
    controllers: [ContentIdeasController],
    providers: [ContentIdeasService, PrismaService],
})
export class ContentIdeasModule { }
