import {
  Either,
  IRepositoryError,
} from '../../../../commonMethods/domainResults/interfaces';
import { ICreateUserDTO } from '../../interfaces/user/ICreateUser';
import { User } from '../entities/User';

export interface IUsersRepository {
  create(
    createUserData: ICreateUserDTO,
  ): Promise<Either<User, IRepositoryError>>;
  findByEmail(
    email: string,
    includePassword?: boolean,
  ): Promise<Either<User | undefined, IRepositoryError>>;
}
