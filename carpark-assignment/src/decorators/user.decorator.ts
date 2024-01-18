import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';

export interface RequestUser {
  sub: string;
  refreshToken?: string;
}

export const UserDecorator = createParamDecorator<
  keyof User,
  ExecutionContext,
  any
>((key, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user as User;
  return key ? user[key] : user;
});
