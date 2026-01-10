import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateAnalyticsDto {
    @IsInt()
    @Min(0)
    likes: number;

    @IsInt()
    @Min(0)
    comments: number;

    @IsInt()
    @Min(0)
    views: number;

    @IsInt()
    @Min(0)
    shares: number;

    @IsOptional()
    @IsString()
    notes?: string;
}

export class UpdateAnalyticsDto {
    @IsOptional()
    @IsInt()
    @Min(0)
    likes?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    comments?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    views?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    shares?: number;

    @IsOptional()
    @IsString()
    notes?: string;
}
