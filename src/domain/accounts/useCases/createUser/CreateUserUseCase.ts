import { injectable, inject } from 'tsyringe';

import {
  Either,
  IUseCaseError,
} from '../../../../helpers/domainResults/interfaces';
import { UseCase } from '../../../../shared/base/UseCase';
import { IUsersRepository } from '../../infra/contracts/IUsersRepository';
import { User } from '../../infra/typeorm/entities/User';
import { ICreateUserDTO } from '../../interfaces/user/ICreateUser';

@injectable()
export class CreateUserUseCase extends UseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {
    super();
  }

  private async userAlreadyExists(email: string): Promise<boolean> {
    try {
      const { data } = await this.repository.findByEmail(email);

      return !!data;
    } catch (error) {
      this.logger({
        error,
        type: 'DefaultError',
      });
      return false;
    }
  }

  async execute(
    createUserData: ICreateUserDTO,
  ): Promise<Either<IUseCaseError, User>> {
    try {
      const { email } = createUserData;

      if (await this.userAlreadyExists(email)) {
        return this.left({
          message: 'Email already registered on the platform',
          statusCode: 400,
        });
      }

      const { data, isFailure, error } = await this.repository.createOrSave(
        createUserData,
      );

      if (isFailure) {
        return this.left({
          message: error.message,
          statusCode: 400,
        });
      }

      delete data.password;

      return this.right<User>(data);
    } catch (error) {
      this.logger({
        error,
        type: 'FatalError',
      });
      return error;
    }
  }
}
