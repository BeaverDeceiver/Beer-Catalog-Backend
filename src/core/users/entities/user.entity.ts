import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserToRole } from './user-to-role.entity';
import { UserInfo } from './user-info.entity';
import { Favorite } from 'src/core/beer/entities/favorite.entity';

@Entity({ name: 'users', engine: 'InnoDB' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 255, unique: true })
  email: string;

  @Column({ name: 'first_name', nullable: false, length: 100, unique: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false, length: 100, unique: false })
  lastName: string;

  @Column({ nullable: false, length: 100 })
  password: string;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.user, {
    nullable: false,
  })
  userInfo: UserInfo;

  @OneToMany(() => UserToRole, (userToRole) => userToRole.user)
  userToRoles: UserToRole[];

  @OneToMany(() => Favorite, (favorite) => favorite.userId) favorite: Favorite;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}
