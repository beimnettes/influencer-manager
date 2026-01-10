import { IsString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { Platform, Tone } from '@prisma/client';

export class CreateCaptionDto {
    @IsString()
    content: string;

    @IsEnum(Platform)
    platform: Platform;

    @IsEnum(Tone)
    tone: Tone;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    hashtags?: string[];
}

export class UpdateCaptionDto {
    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsEnum(Platform)
    platform?: Platform;

    @IsOptional()
    @IsEnum(Tone)
    tone?: Tone;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    hashtags?: string[];
}
