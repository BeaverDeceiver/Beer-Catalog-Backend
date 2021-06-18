import { IUser } from './user.interface';

export interface IUserInfo {
  id?: number;
  user?: IUser;
  dob?: Date;
  avatar_url?: string;
}
