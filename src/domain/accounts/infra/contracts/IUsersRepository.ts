import {
  Either,
  IRepositoryError,
} from '../../../../helpers/domainResults/interfaces';
import { ICreateUserDTO } from '../../interfaces/user/ICreateUser';
import { User } from '../typeorm/entities/User';

export interface IUsersRepository {
  createOrSave(
    createUserData: ICreateUserDTO | User,
  ): Promise<Either<IRepositoryError, User>>;
  findByEmail(
    email: string,
    includePassword?: boolean,
  ): Promise<Either<IRepositoryError, User | undefined>>;
  findById(id: string): Promise<Either<IRepositoryError, User | undefined>>;
}
