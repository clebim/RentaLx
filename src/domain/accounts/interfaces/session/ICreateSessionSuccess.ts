import { User } from '../../infra/entities/User';

export interface ICreateSessionSuccess {
  user: User;
  accessToken: string;
}
