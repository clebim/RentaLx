import { User } from '../../infra/typeorm/entities/User';

export interface ICreateSessionSuccess {
  user: User;
  accessToken: string;
}
