import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/user.dto';
import { RegisterResponse } from './response/user.response';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register',
  })
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({
    type: RegisterResponse,
  })
  login(@Body() data: RegisterDto) {
    return this.userService.register(data);
  }
}
