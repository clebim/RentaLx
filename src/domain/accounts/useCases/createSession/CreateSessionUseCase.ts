import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppConfig from '../../../../api/config/App';
import {
  Either,
  IUseCaseError,
} from '../../../../helpers/domainResults/interfaces';
import { UseCase } from '../../../../shared/base/UseCase';
import { IUsersRepository } from '../../infra/contracts/IUsersRepository';
import { ICreateSessionDTO } from '../../interfaces/session/ICreateSession';
import { ICreateSessionSuccess } from '../../interfaces/session/ICreateSessionSuccess';

@injectable()
export class CreateSessionUseCase extends UseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {
    super();
  }

  async execute({
    email,
    password,
  }: ICreateSessionDTO): Promise<Either<ICreateSessionSuccess, IUseCaseError>> {
    try {
      const { data: user } = await this.repository.findByEmail(email, true);

      if (!user) {
        return this.buildError({
          message: 'Email or password incorrect!',
          statusCode: 400,
        });
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return this.buildError({
          message: 'Email or password incorrect!',
          statusCode: 400,
        });
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

      return this.buildSuccess<ICreateSessionSuccess>({
        user,
        accessToken: token,
      });
    } catch (error) {
      this.logger({
        error,
        type: 'FatalError',
      });
      return error;
    }
  }
}
