import { getRepository, Repository } from 'typeorm';

import {
  createRepositoryError,
  createRepositorySuccess,
} from '../../../../commonMethods/domainResults/CreateRepositoryError';
import {
  Either,
  IRepositoryError,
} from '../../../../commonMethods/domainResults/interfaces';
import { logger } from '../../../../commonMethods/logger';
import { ICreateUserDTO } from '../../interfaces/user/ICreateUser';
import { IUsersRepository } from '../contracts/IUsersRepository';
import { User } from '../entities/User';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async findById(id: string): Promise<Either<User, IRepositoryError>> {
    try {
      const user = await this.repository.findOne(id);

      return createRepositorySuccess<User | undefined>(user);
    } catch (error) {
      logger({
        type: 'DatabaseError',
        error,
      });
      return this.buildError('Error find a user in database');
    }
  }
  async findByEmail(
    email: string,
    includePassword = false,
  ): Promise<Either<User | undefined, IRepositoryError>> {
    const selectArray: (keyof User)[] = [
      'id',
      'name',
      'email',
      'driverLicense',
      'isAdmin',
      'createdAt',
    ];

    if (includePassword) {
      selectArray.push('password');
    }

    try {
      const user = await this.repository.findOne({
        where: { email },
        select: selectArray,
      });

      return createRepositorySuccess<User | undefined>(user);
    } catch (error) {
      logger({
        type: 'DatabaseError',
        error,
      });
      return this.buildError('Error find a user in database');
    }
  }

  private buildError(message: string) {
    return createRepositoryError({
      message,
      repository: 'UserRepository',
    });
  }

  async createOrSave(
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
