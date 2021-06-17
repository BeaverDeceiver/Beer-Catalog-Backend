import { IUser } from '../users/user.interface';

export interface IRole {
  id?: number;
  name: string;
  users?: IUser[];
}
