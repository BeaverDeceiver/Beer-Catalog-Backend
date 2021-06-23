import { User } from 'src/core/users/entities';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'favorites', engine: 'InnoDB' })
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'user_id' })
  userId: number;

  @Column({ nullable: false, name: 'beer_id' })
  beerId: number;

  @ManyToOne(() => User, (user) => user.id) user: User;

  @Column({ nullable: false })
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}
