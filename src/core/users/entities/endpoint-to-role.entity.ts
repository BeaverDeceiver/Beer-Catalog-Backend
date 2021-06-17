import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Endpoint } from './endpoint.entity';
import { Role } from './role.entity';

@Entity({ name: 'endpoints_roles', engine: 'InnoDB' })
export class EndpointToRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'permission_mask', nullable: false })
  permissionMask: number;

  @ManyToOne(() => Role, (role) => role.endpointToRoles)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;

  @ManyToOne(() => Endpoint, (endpoint) => endpoint.endpointToRoles)
  @JoinColumn({ name: 'endpoint_id', referencedColumnName: 'id' })
  endpoint: Endpoint;

  @DeleteDateColumn({ name: 'deleted_date', type: 'timestamp', nullable: true })
  deletedDate: Date;
}
