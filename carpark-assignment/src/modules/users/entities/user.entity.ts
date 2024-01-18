import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Favorite } from 'src/modules/favorite/entities/favorite.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @ApiProperty({
    type: String,
  })
  @Column({
    type: 'varchar',
    length: 256,
  })
  email: string;

  @IsString()
  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  refreshToken?: string;

  @OneToMany<Favorite>(() => Favorite, (favoriteList) => favoriteList.user)
  favoriteList: Favorite[];
}
