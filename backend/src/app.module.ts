import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { ContentIdeasModule } from './content-ideas/content-ideas.module';
import { CaptionsModule } from './captions/captions.module';
import { PostsModule } from './posts/posts.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Rate Limiting - Protection against brute force and DoS attacks
    ThrottlerModule.forRoot([{
      ttl: 60000,  // time window in milliseconds (60 seconds)
      limit: process.env.NODE_ENV === 'production' ? 10 : 20,  // stricter in production
    }]),
    AuthModule,
    ContentIdeasModule,
    CaptionsModule,
    PostsModule,
    AnalyticsModule,
    DashboardModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    // Apply rate limiting globally
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }

