import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RefreshTokenGuard } from 'src/guards/refresh-token.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { LoginResponse } from './response/auth.response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login',
  })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    type: LoginResponse,
  })
  login(@Body() data: LoginDto): Promise<LoginResponse> {
    return this.authService.login(data);
  }

  @Get('refresh')
  @ApiOperation({
    summary: 'Get new accessToken & refreshToken',
    description: 'Add old refreshToken in <b>Authorization</b>',
  })
  @UseGuards(RefreshTokenGuard)
  @ApiOkResponse({
    type: LoginResponse,
  })
  @ApiBearerAuth()
  refresh(@Req() req: any): Promise<LoginResponse> {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
