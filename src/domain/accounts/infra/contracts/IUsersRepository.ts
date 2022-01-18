import {
  Either,
  IRepositoryError,
} from '../../../../commonMethods/domainResults/interfaces';
import { ICreateUserDTO } from '../../interfaces/user/ICreateUser';
import { User } from '../typeorm/entities/User';

export interface IUsersRepository {
  createOrSave(
    createUserData: ICreateUserDTO,
  ): Promise<Either<User, IRepositoryError>>;
  findByEmail(
    email: string,
    includePassword?: boolean,
  ): Promise<Either<User | undefined, IRepositoryError>>;
  findById(id: string): Promise<Either<User | undefined, IRepositoryError>>;
}
