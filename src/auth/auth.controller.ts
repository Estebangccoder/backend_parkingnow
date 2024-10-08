import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Roles } from './decorators/roles.decorators';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enums/rol.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { UserPaginationDto } from 'src/users/dto/users-pagination.dto';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Login' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({
        status: 200,
        description: 'Successful login',
        schema: {
            example: {
                token: 'your_jwt_token_here',
                email: 'admin@example.com'
            }
        }
    })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ type: RegisterDto })
    @ApiResponse({
        status: 201,
        description: 'User registered successfully',
        schema: {
            example: {
                fullname: 'Admin de prueba',
                email: 'admin@example.com'
            }
        }
    })
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Get('profile')
    @ApiBearerAuth()
    @Roles(Role.USER)
    @UseGuards(AuthGuard, RolesGuard)
    @ApiOperation({ summary: 'Get user profile' })
    @ApiResponse({
        status: 200,
        description: 'Get user profile',
        schema: {
            example: {
                fullname: 'Admin de prueba',
                email: 'admin@example.com',
                phone_number: '3216549870',
                address: 'Riwi',
                document_type_id: 1,
                doc_number: '12345678910',
                role_id: 2
            }
        }
    })
    profile(@Req() req: RequestWithUser) {
        return this.authService.profile({
            email: req.user.email,
            role_id: req.user.role_id
        });
    }

    
}