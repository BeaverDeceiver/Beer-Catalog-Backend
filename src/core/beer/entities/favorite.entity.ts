import { User } from 'src/core/users/entities';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'favorites', engine: 'InnoDB' })
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'beer_id' })
  beerId: number;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({ nullable: true })
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}
