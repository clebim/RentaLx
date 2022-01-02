import { getRepository, Repository } from 'typeorm';

import {
  createRepositoryError,
  createRepositorySuccess,
} from '../../../../common-methods/domainResults/CreateRepositoryError';
import {
  Either,
  IRepositoryError,
} from '../../../../common-methods/domainResults/interfaces';
import { logger } from '../../../../common-methods/logger';
import { ICreateUserDTO } from '../../interfaces/ICreateUser';
import { IUsersRepository } from '../contracts/IUsersRepository';
import { User } from '../entities/User';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async findByEmail(
    email: string,
  ): Promise<Either<User | undefined, IRepositoryError>> {
    try {
      const user = await this.repository.findOne({ where: { email } });

      return createRepositorySuccess<User | undefined>(user);
    } catch (error) {
      logger({
        type: 'DatabaseError',
        error,
      });
      return this.buildError('Error inserting a new user in database');
    }
  }

  private buildError<T>(message: string) {
    return createRepositoryError<T>({
      message,
      repository: 'UserRepository',
    });
  }

  async create(
    createUserData: ICreateUserDTO,
  ): Promise<Either<User, IRepositoryError>> {
    try {
      const user = this.repository.create(createUserData);

      await this.repository.save(user);

      return createRepositorySuccess<User>(user);
    } catch (error) {
      logger({
        type: 'DatabaseError',
        error,
      });
      return this.buildError('Error inserting a new user in database');
    }
  }
}
