import { PickType } from '@nestjs/swagger';
import { User } from 'src/modules/users/entities/user.entity';

export class RegisterDto extends PickType(User, ['email', 'password']) {}
