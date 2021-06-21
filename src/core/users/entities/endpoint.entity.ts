import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EndpointToRole } from './endpoint-to-role.entity';

@Entity({ name: 'endpoints', engine: 'InnoDB' })
export class Endpoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 2048, unique: true })
  url: string;

  @OneToMany(() => EndpointToRole, (endpointToRole) => endpointToRole.endpoint)
  endpointToRoles: EndpointToRole[];

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}
