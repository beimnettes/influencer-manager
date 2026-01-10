/*
 * ================================================================================================
 * DATABASE SEED FILE - DEVELOPMENT/DEMO ONLY
 * ================================================================================================
 * 
 * ⚠️  SECURITY WARNING ⚠️
 * 
 * This file contains HARDCODED TEST CREDENTIALS for development and demonstration purposes.
 * 
 * Test Accounts:
 *   - admin@influencer.com / password123 (ADMIN role)
 *   - user@influencer.com / password123 (USER role)
 * 
 * 🚫 DO NOT USE IN PRODUCTION!
 * 🚫 These are publicly known test credentials
 * 🚫 Change all passwords in production environments
 * 
 * This seed file is designed to help with:
 *   - Local development setup
 *   - Demo/portfolio presentations
 *   - Testing the application
 * 
 * For production, use secure, unique credentials and consider removing or securing this file.
 * 
 * ================================================================================================
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is required');
}
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('🌱 Starting database seeding...');
    console.log('⚠️  WARNING: Using TEST CREDENTIALS - Development/Demo Only!');
    console.log('═══════════════════════════════════════════════════════════\n');

    // Hash passwords
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create Admin User
    const admin = await prisma.user.upsert({
        where: { email: 'admin@influencer.com' },
        update: {},
        create: {
            email: 'admin@influencer.com',
            password: hashedPassword,
            name: 'Admin User',
            role: 'ADMIN',
        },
    });
    console.log('✅ Created admin user:', admin.email);

    // Create Regular User
    const user = await prisma.user.upsert({
        where: { email: 'user@influencer.com' },
        update: {},
        create: {
            email: 'user@influencer.com',
            password: hashedPassword,
            name: 'Demo Creator',
            role: 'USER',
        },
    });
    console.log('✅ Created regular user:', user.email);

    // Create sample content for BOTH admin and demo user
    console.log('📝 Creating sample content for admin and demo user...');

    // Helper function to create sample data for a user
    async function createSampleDataForUser(userId: string, userName: string) {
        // Sample Content Ideas
        const ideas = await prisma.contentIdea.createMany({
            data: [
                {
                    userId,
                    title: 'Summer Beach Vibes',
                    description: 'A series showcasing summer fashion essentials and beach lifestyle tips.',
                    platform: 'INSTAGRAM',
                    tags: ['summer', 'fashion', 'beach', 'lifestyle'],
                },
                {
                    userId,
                    title: 'Morning Routine Revolution',
                    description: 'Share your productive morning routine with wellness tips and hacks.',
                    platform: 'TIKTOK',
                    tags: ['morning', 'productivity', 'wellness', 'routine'],
                },
                {
                    userId,
                    title: 'Tech Review: Latest Gadgets',
                    description: 'Comprehensive review of the newest tech products on the market.',
                    platform: 'YOUTUBE',
                    tags: ['tech', 'review', 'gadgets', 'technology'],
                },
                {
                    userId,
                    title: 'Healthy Meal Prep Ideas',
                    description: 'Easy and nutritious meal prep for busy professionals.',
                    platform: 'INSTAGRAM',
                    tags: ['food', 'health', 'mealprep', 'cooking'],
                },
                {
                    userId,
                    title: 'Home Workout Challenge',
                    description: '30-day fitness challenge you can do at home with no equipment.',
                    platform: 'TIKTOK',
                    tags: ['fitness', 'workout', 'challenge', 'health'],
                },
            ],
        });
        console.log(`  ✅ Created ${ideas.count} content ideas for ${userName}`);

        // Sample Captions
        const captions = await prisma.caption.createMany({
            data: [
                {
                    userId,
                    content: 'Living my best life! ✨ This summer is all about good vibes and positive energy. What are your plans? #SummerVibes #GoodLife',
                    platform: 'INSTAGRAM',
                    tone: 'CASUAL',
                    hashtags: ['SummerVibes', 'GoodLife', 'PositiveEnergy'],
                },
                {
                    userId,
                    content: 'New tutorial dropping soon! 🎥 Stay tuned for an in-depth look at the latest tech. Hit that subscribe button! #TechReview #NewVideo',
                    platform: 'YOUTUBE',
                    tone: 'PROFESSIONAL',
                    hashtags: ['TechReview', 'NewVideo', 'Subscribe'],
                },
                {
                    userId,
                    content: '5 AM club checking in! ☀️ Starting the day with meditation, journaling, and a killer workout. Who else is up? #MorningRoutine #ProductivityTips',
                    platform: 'TIKTOK',
                    tone: 'INSPIRATIONAL',
                    hashtags: ['MorningRoutine', 'ProductivityTips', '5AMClub'],
                },
            ],
        });
        console.log(`  ✅ Created ${captions.count} captions for ${userName}`);

        // Sample Posts
        const now = new Date();
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const twoDays = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
        const threeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

        await prisma.post.create({
            data: {
                userId,
                title: 'Summer Fashion Trends',
                description: 'Checkout the hottest summer fashion trends of 2026!',
                platform: 'INSTAGRAM',
                status: 'SCHEDULED',
                scheduledFor: tomorrow,
            },
        });

        await prisma.post.create({
            data: {
                userId,
                title: 'Morning Routine Tutorial',
                description: 'Share my productive morning routine',
                platform: 'TIKTOK',
                status: 'DRAFT',
                scheduledFor: twoDays,
            },
        });

        const post3 = await prisma.post.create({
            data: {
                userId,
                title: 'Tech Product Review',
                description: 'Comprehensive review of latest gadgets',
                platform: 'YOUTUBE',
                status: 'POSTED',
                scheduledFor: twoDaysAgo,
                postedAt: twoDaysAgo,
            },
        });

        await prisma.post.create({
            data: {
                userId,
                title: 'Healthy Meal Prep Guide',
                description: 'Easy meal prep for busy professionals',
                platform: 'INSTAGRAM',
                status: 'SCHEDULED',
                scheduledFor: threeDays,
            },
        });

        const post5 = await prisma.post.create({
            data: {
                userId,
                title: 'Home Workout Challenge',
                description: '30-day fitness challenge announcement',
                platform: 'TIKTOK',
                status: 'POSTED',
                scheduledFor: yesterday,
                postedAt: yesterday,
            },
        });

        console.log(`  ✅ Created 5 posts for ${userName}`);

        // Sample Analytics for Posted Content
        await prisma.analytics.create({
            data: {
                postId: post3.id,
                userId,
                views: 5420,
                likes: 892,
                comments: 124,
                shares: 67,
                notes: 'Great engagement! Video performed well in the first 24 hours.',
            },
        });

        await prisma.analytics.create({
            data: {
                postId: post5.id,
                userId,
                views: 3927,
                likes: 654,
                comments: 78,
                shares: 123,
                notes: 'Viral potential - challenge format resonating with audience.',
            },
        });

        console.log(`  ✅ Created analytics data for ${userName}`);
    }

    // Create sample data for both users
    await createSampleDataForUser(admin.id, 'Admin User');
    await createSampleDataForUser(user.id, 'Demo Creator');

    console.log('\n🎉 Database seeding completed!\n');
    console.log('📧 Login Credentials:');
    console.log('┌─────────────────────────────────────────┐');
    console.log('│ Admin Account:                          │');
    console.log('│   Email: admin@influencer.com           │');
    console.log('│   Password: password123                 │');
    console.log('│   Role: ADMIN                           │');
    console.log('├─────────────────────────────────────────┤');
    console.log('│ Demo User Account:                      │');
    console.log('│   Email: user@influencer.com            │');
    console.log('│   Password: password123                 │');
    console.log('│   Role: USER                            │');
    console.log('└─────────────────────────────────────────┘');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
