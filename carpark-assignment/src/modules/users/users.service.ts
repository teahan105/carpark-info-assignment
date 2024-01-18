import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { IConfig } from 'config';
import { BaseService } from 'src/base/base.service';
import { Errors } from 'src/constants/errors';
import { Repository } from 'typeorm';
import { CONFIG } from '../config/config.provider';
import { RegisterDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(CONFIG) private readonly configService: IConfig,
  ) {
    super(usersRepository);
  }

  async getUser(userId: number) {
    return this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  async register(data: RegisterDto) {
    const { email, password } = data;

    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    data.password = await hashSync(password, 10);

    if (user) throw new BadRequestException(Errors.USER_EMAIL_EXISTED);

    return this.store(data);
  }
}
