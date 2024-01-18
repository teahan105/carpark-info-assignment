import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_LIMIT } from 'src/constants/constants';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoriteRepository {
  private readonly alias: string = 'favorite';

  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  getRepository(): Repository<Favorite> {
    return this.favoriteRepository;
  }

  async getFavoriteCarparkList(
    userId: number,
    page: number,
    limit: number,
  ): Promise<[Favorite[], number]> {
    const queryBuilder = this.createBaseQueryBuilder();

    this.addWhereClauses(queryBuilder, userId);
    this.addSelectClauses(queryBuilder);
    this.addOrderByClause(queryBuilder);
    this.addPagingClauses(queryBuilder, page, limit);

    return queryBuilder.getManyAndCount();
  }

  private createBaseQueryBuilder(): SelectQueryBuilder<Favorite> {
    return this.favoriteRepository.createQueryBuilder(this.alias);
  }

  private addWhereClauses(
    queryBuilder: SelectQueryBuilder<Favorite>,
    userId: number,
  ): void {
    queryBuilder.where(`${this.alias}.userId = :userId`, { userId });
  }

  private addSelectClauses(queryBuilder: SelectQueryBuilder<Favorite>): void {
    queryBuilder.select([
      `${this.alias}.id`,
      `${this.alias}.userId`,
      `${this.alias}.carParkNoId`,
      `${this.alias}.status`,
      `${this.alias}.created_at`,
      `${this.alias}.updated_at`,
    ]);
  }

  private addOrderByClause(queryBuilder: SelectQueryBuilder<Favorite>): void {
    queryBuilder.orderBy(`${this.alias}.id`, 'DESC');
  }

  private addPagingClauses(
    queryBuilder: SelectQueryBuilder<Favorite>,
    page: number,
    limit: number,
  ): void {
    if (limit) {
      queryBuilder.take(limit);
    }
    if (page) {
      queryBuilder.skip((page - 1) * (limit || DEFAULT_LIMIT));
    }
  }
}
