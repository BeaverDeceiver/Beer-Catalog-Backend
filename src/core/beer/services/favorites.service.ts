import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Favorite } from '../entities';

@Injectable()
export class FavoritesService {
  constructor(
    private connection: Connection,
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async addFavorite(beerId: number, userId: number) {
    const favorite = this.favoriteRepository.create({
      user: { id: userId },
      beerId: beerId,
    });
    await this.favoriteRepository.save(favorite);
    return favorite;
  }

  async getUserFavorites(userId: number) {
    return await this.connection
      .getRepository(Favorite)
      .createQueryBuilder('favorites')
      .select(['favorites.id', 'favorites.beerId'])
      .where('favorites.user.id = :userId', { userId: userId })
      .getMany();
  }

  async removeFavorite(beerId: number, userId: number) {
    const favorite = await this.connection
      .getRepository(Favorite)
      .createQueryBuilder('favorites')
      .select(['favorites.id'])
      .where('favorites.user.id = :userId', { userId })
      .andWhere('favorites.beerId = :beerId', { beerId })
      .getOne();

    if (favorite) {
      await this.favoriteRepository.delete(favorite.id);
    }

    return;
  }
}
