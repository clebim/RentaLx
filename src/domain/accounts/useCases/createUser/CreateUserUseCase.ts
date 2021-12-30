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
    @inject('UserRepository')
    private repository: IUsersRepository,
  ) {}

  private buildError(error, statusCode: 400 | 404 | 409) {
    return createServiceError<User>({
      message: error.message,
      statusCode,
    });
  }

  async execute(
    createUserData: ICreateUserDTO,
  ): Promise<Either<User, IServiceError>> {
    try {
      const { data, isFailure, error } = await this.repository.create(
        createUserData,
      );

      if (isFailure) {
        return this.buildError(error, 400);
      }

      return createServiceSuccess<User>(data);
    } catch (error) {
      console.log('caiu aaquqi otarios');
      logger({
        error,
        type: 'DefaultError',
      });
      return error;
    }
  }
}
