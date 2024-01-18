import { IsString } from 'class-validator';
import { BaseEntity } from 'src/base/base.entity';
import { CarparkInfo } from 'src/modules/carpark-info/entities/carpark-info.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'favorite' })
export class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @IsString()
  @Column({ name: 'car_park_no_id', type: 'varchar', length: '255' })
  carParkNoId: string;

  @Column({ name: 'status', type: 'varchar', default: 'ACTIVE' })
  status: string;

  @ManyToOne<User>(() => User, (user) => user.favoriteList, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne<CarparkInfo>(
    () => CarparkInfo,
    (carparkInfo) => carparkInfo.favoriteList,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'car_park_no_id' })
  carparkInfo: CarparkInfo;
}
