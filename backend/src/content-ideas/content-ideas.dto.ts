import { IsString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { Platform } from '@prisma/client';

export class CreateContentIdeaDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsEnum(Platform)
    platform: Platform;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];
}

export class UpdateContentIdeaDto {
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
    @IsArray()
    @IsString({ each: true })
    tags?: string[];
}
