import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './auth.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // Strict rate limiting: 3 signups per minute
    @Post('signup')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    async signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    // Strict rate limiting: 5 logins per minute
    @Post('login')
    @Throttle({ default: { limit: 5, ttl: 60000 } })
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@CurrentUser() user: any) {
        return this.authService.getMe(user.userId);
    }
}
