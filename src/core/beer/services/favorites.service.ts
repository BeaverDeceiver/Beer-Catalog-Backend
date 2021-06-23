import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Favorite } from '../entities';
import { getBeerListURL, idsHelper } from '../utils/URL';
import { map } from 'rxjs/operators';
import { User } from '../../users/entities';
import { parseToken } from '../utils/JWT';

@Injectable()
export class FavoritesService {
  constructor(
    private http: HttpService,
    private connection: Connection,
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async addFavorite(beerId: number, token: string) {
    const userId = parseToken(token).id;

    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const oldFavorite = await this.favoriteRepository.find({
      where: { beerId, user },
    });

    if (oldFavorite) {
      return oldFavorite;
    }

    const favorite = this.favoriteRepository.create({
      user: { id: userId },
      beerId: beerId,
    });
    await this.favoriteRepository.save(favorite);
    return favorite;
  }

  async getUserFavorites(token: string) {
    const userId = parseToken(token).id;

    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const favorites = await this.connection
      .getRepository(Favorite)
      .createQueryBuilder('favorites')
      .select(['favorites.id', 'favorites.beerId'])
      .where('favorites.user.id = :userId', { userId: userId })
      .getMany();
    return this.http
      .get(
        getBeerListURL({
          ids: idsHelper(favorites),
        }).toString(),
      )
      .pipe(map((response) => response.data));
  }

  async removeFavorite(beerId: number, token: string) {
    const userId = parseToken(token).id;

    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

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
