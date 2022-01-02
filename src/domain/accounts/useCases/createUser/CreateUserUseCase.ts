import { injectable, inject } from 'tsyringe';

import {
  createServiceError,
  createServiceSuccess,
} from '../../../../common-methods/domainResults/CreateServiceResults';
import {
  Either,
  IServiceError,
} from '../../../../common-methods/domainResults/interfaces';
import { logger } from '../../../../common-methods/logger';
import { IUsersRepository } from '../../infra/contracts/IUsersRepository';
import { User } from '../../infra/entities/User';
import { ICreateUserDTO } from '../../interfaces/ICreateUser';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  private buildError(error, statusCode: 400 | 404 | 409) {
    return createServiceError<User>({
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
      const userAlreadyExists = await this.userAlreadyExists(
        createUserData.email,
      );

      if (userAlreadyExists) {
        return this.buildError(
          { message: 'Email already registered on the platform' },
          400,
        );
      }

      const { data, isFailure, error } = await this.repository.create(
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
