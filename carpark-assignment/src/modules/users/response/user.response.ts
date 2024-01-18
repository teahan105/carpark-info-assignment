import { ApiProperty } from '@nestjs/swagger';
import { Payload } from 'src/modules/auth/interface/auth.interface';

export class RegisterResponse {
  @ApiProperty({
    description: 'user',
  })
  user: Payload;
}
