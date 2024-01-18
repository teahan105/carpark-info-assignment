import { BaseEntity } from 'src/base/base.entity';
import { Favorite } from 'src/modules/favorite/entities/favorite.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'carpark-info' })
export class CarparkInfo extends BaseEntity {
  @PrimaryColumn({
    name: 'Car_park_no',
    type: 'varchar',
    length: '255',
  })
  carParkNo: string;

  @Column({
    name: 'Address',
    type: 'varchar',
    length: '500',
  })
  address: string;

  @Column({
    name: 'X_coord',
    type: 'real',
  })
  xCoord: number;

  @Column({
    name: 'Y_coord',
    type: 'real',
  })
  yCoord: number;

  @Column({
    name: 'Car_park_type',
    type: 'varchar',
    length: '255',
  })
  carParkType: string;

  @Column({
    name: 'Type_of_parking_system',
    type: 'varchar',
    length: '255',
  })
  typeOfParkingSystem: string;

  @Column({
    name: 'Short_term_parking',
    type: 'varchar',
    length: '255',
  })
  shortTermParking: string;

  @Column({
    name: 'Free_parking',
    type: 'varchar',
    length: '255',
  })
  freeParking: string;

  @Column({
    name: 'Night_parking',
    type: 'varchar',
    length: '255',
  })
  nightParking: string;

  @Column({
    name: 'Car_park_decks',
    type: 'integer',
  })
  carParkDecks: number;

  @Column({
    name: 'Gantry_height',
    type: 'real',
  })
  gantryHeight: number;

  @Column({
    name: 'Car_park_basement',
    type: 'varchar',
    length: '255',
  })
  carParkBasement: string;

  @OneToMany<Favorite>(
    () => Favorite,
    (favoriteList) => favoriteList.carparkInfo,
  )
  favoriteList: Favorite[];
}
