import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import {
  createServiceError,
  createServiceSuccess,
} from '../../../../commonMethods/domainResults/CreateServiceResults';
import {
  Either,
  IServiceError,
} from '../../../../commonMethods/domainResults/interfaces';
import { logger } from '../../../../commonMethods/logger';
import AppConfig from '../../../../config/App';
import { IUsersRepository } from '../../infra/contracts/IUsersRepository';
import { ICreateSession } from '../../interfaces/session/ICreateSession';
import { ICreateSessionSuccess } from '../../interfaces/session/ICreateSessionSuccess';

@injectable()
export class CreateSessionUseCase {
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

  async execute({
    email,
    password,
  }: ICreateSession): Promise<Either<ICreateSessionSuccess, IServiceError>> {
    try {
      const { data: user } = await this.repository.findByEmail(email, true);

      if (!user) {
        return this.buildError(
          { message: 'Email or password incorrect!' },
          400,
        );
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return this.buildError(
          { message: 'Email or password incorrect!' },
          400,
        );
      }

      const { id, name, driverLicense, isAdmin } = user;

      delete user.password;

      const tokenPayload = {
        id,
        name,
        email,
        driverLicense,
        isAdmin,
      };

      const token = sign(tokenPayload, AppConfig.Auth.secret, {
        subject: id,
        expiresIn: AppConfig.Auth.expiresIn,
      });

      return createServiceSuccess<ICreateSessionSuccess>({
        user,
        accessToken: token,
      });
    } catch (error) {
      logger({
        error,
        type: 'DefaultError',
      });
      return error;
    }
  }
}