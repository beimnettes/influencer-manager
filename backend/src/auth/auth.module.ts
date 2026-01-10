import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../prisma.service';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: () => {
                const secret = process.env.JWT_SECRET;

                if (!secret) {
                    throw new Error(
                        '❌ FATAL: JWT_SECRET environment variable is not set!\n' +
                        '   This is required for authentication to work securely.\n' +
                        '   Please set JWT_SECRET in your .env file.\n' +
                        '   See .env.example for guidance.'
                    );
                }

                return {
                    secret,
                    signOptions: {
                        expiresIn: '7d',
                    },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, PrismaService],
    exports: [AuthService],
})
export class AuthModule { }
