import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'users_info', engine: 'InnoDB' })
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.userInfo)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({ nullable: true })
  birthday: Date;

  @Column({ name: 'avatar_url', nullable: true })
  avatar_url: number;

  @DeleteDateColumn({ name: 'deleted_date', type: 'timestamp', nullable: true })
  deletedDate: Date;
}
