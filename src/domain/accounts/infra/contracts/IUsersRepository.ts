import {
  Either,
  IRepositoryError,
} from '../../../../common-methods/domainResults/interfaces';
import { ICreateUserDTO } from '../../interfaces/ICreateUser';
import { User } from '../entities/User';

export interface IUsersRepository {
  create(
    createUserData: ICreateUserDTO,
  ): Promise<Either<User, IRepositoryError>>;
  findByEmail(
    email: string,
  ): Promise<Either<User | undefined, IRepositoryError>>;
}
