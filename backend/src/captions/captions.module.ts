import { Module } from '@nestjs/common';
import { CaptionsService } from './captions.service';
import { CaptionsController } from './captions.controller';
import { PrismaService } from '../prisma.service';

@Module({
    controllers: [CaptionsController],
    providers: [CaptionsService, PrismaService],
})
export class CaptionsModule { }
