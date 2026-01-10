import {
    IsString,
    IsOptional,
    IsEnum,
    IsUUID,
    IsDateString,
} from 'class-validator';
import { Platform, PostStatus } from '@prisma/client';

export class CreatePostDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsEnum(Platform)
    platform: Platform;

    @IsOptional()
    @IsEnum(PostStatus)
    status?: PostStatus;

    @IsOptional()
    @IsUUID()
    contentIdeaId?: string;

    @IsOptional()
    @IsUUID()
    captionId?: string;

    @IsOptional()
    @IsDateString()
    scheduledFor?: string;
}

export class UpdatePostDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(Platform)
    platform?: Platform;

    @IsOptional()
    @IsEnum(PostStatus)
    status?: PostStatus;

    @IsOptional()
    @IsUUID()
    contentIdeaId?: string;

    @IsOptional()
    @IsUUID()
    captionId?: string;

    @IsOptional()
    @IsDateString()
    scheduledFor?: string;

    @IsOptional()
    @IsDateString()
    postedAt?: string;
}
