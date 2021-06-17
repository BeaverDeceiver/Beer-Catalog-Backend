import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EndpointToRole } from './endpoint-to-role.entity';
import { UserToRole } from './user-to-role.entity';

@Entity({ name: 'roles', engine: 'InnoDB' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50, unique: true })
  name: string;

  @OneToMany(() => UserToRole, (userToRole) => userToRole.role)
  userToRoles: UserToRole[];

  @OneToMany(() => EndpointToRole, (endpointToRole) => endpointToRole.role)
  endpointToRoles: EndpointToRole[];

  @DeleteDateColumn({ name: 'deleted_date', type: 'timestamp', nullable: true })
  deletedDate: Date;
}
