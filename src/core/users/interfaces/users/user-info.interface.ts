import { IUser } from './user.interface';

export interface IUserInfo {
  id?: number;
  user?: IUser;
  birthday?: Date;
  avatar_url?: string;
}
