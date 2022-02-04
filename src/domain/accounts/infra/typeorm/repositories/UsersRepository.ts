import { getRepository, Repository as TypeOrmRepository } from 'typeorm';

import {
  Either,
  IRepositoryError,
} from '../../../../../helpers/domainResults/interfaces';
import { Repository } from '../../../../../shared/base/Repository';
import { ICreateUserDTO } from '../../../interfaces/user/ICreateUser';
import { IUsersRepository } from '../../contracts/IUsersRepository';
import { User } from '../entities/User';

export class UsersRepository extends Repository implements IUsersRepository {
  private repository: TypeOrmRepository<User>;

  constructor() {
    super('UsersRepository');
    this.repository = getRepository(User);
  }
  async findById(id: string): Promise<Either<IRepositoryError, User>> {
    try {
      const user = await this.repository.findOne(id);

      return this.right<User | undefined>(user);
    } catch (error) {
      return this.left({
        message: 'Error find a user in database',
        error,
      });
    }
  }
  async findByEmail(
    email: string,
    includePassword = false,
  ): Promise<Either<IRepositoryError, User | undefined>> {
    const selectArray: (keyof User)[] = [
      'id',
      'name',
      'email',
      'driverLicense',
      'avatarUrl',
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

      return this.right<User | undefined>(user);
    } catch (error) {
      return this.left({
        message: 'Error find a user in database',
        error,
      });
    }
  }

  async createOrSave(
    createUserData: ICreateUserDTO | User,
  ): Promise<Either<IRepositoryError, User>> {
    try {
      const user = this.repository.create(createUserData);

      await this.repository.save(user);

      return this.right<User>(user);
    } catch (error) {
      return this.left({
        message: 'Error inserting a new user in database',
        error,
      });
    }
  }
}
