import { injectable, inject } from 'tsyringe';

import {
  createServiceError,
  createServiceSuccess,
} from '../../../../helpers/domainResults/CreateServiceResults';
import {
  Either,
  IServiceError,
} from '../../../../helpers/domainResults/interfaces';
import { logger } from '../../../../helpers/logger';
import { IUsersRepository } from '../../infra/contracts/IUsersRepository';
import { User } from '../../infra/typeorm/entities/User';
import { ICreateUserDTO } from '../../interfaces/user/ICreateUser';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  private buildError(error, statusCode: 400 | 404 | 409) {
    return createServiceError({
      message: error.message,
      statusCode,
    });
  }

  async userAlreadyExists(email: string): Promise<boolean> {
    try {
      const { data } = await this.repository.findByEmail(email);

      return !!data;
    } catch (error) {
      logger({
        error,
        type: 'DefaultError',
      });
      return false;
    }
  }

  async execute(
    createUserData: ICreateUserDTO,
  ): Promise<Either<User, IServiceError>> {
    try {
      const { email } = createUserData;

      if (await this.userAlreadyExists(email)) {
        return this.buildError(
          { message: 'Email already registered on the platform' },
          400,
        );
      }

      const { data, isFailure, error } = await this.repository.createOrSave(
        createUserData,
      );

      if (isFailure) {
        return this.buildError(error, 400);
      }

      delete data.password;

      return createServiceSuccess<User>(data);
    } catch (error) {
      logger({
        error,
        type: 'DefaultError',
      });
      return error;
    }
  }
}
