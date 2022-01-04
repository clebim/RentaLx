import { inject, injectable } from 'tsyringe';

import {
  createServiceError,
  createServiceSuccess,
} from '../../../../commonMethods/domainResults/CreateServiceResults';
import {
  Either,
  IServiceError,
} from '../../../../commonMethods/domainResults/interfaces';
import { logger } from '../../../../commonMethods/logger';
import { IUsersRepository } from '../../infra/contracts/IUsersRepository';
import { IUpdateUserAvatarDTO } from '../../interfaces/user/IUpdateUserAvatar';

@injectable()
export class UpdateUserAvatarUseCase {
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
    userId,
    avatarFile,
  }: IUpdateUserAvatarDTO): Promise<Either<null, IServiceError>> {
    try {
      const { data: user } = await this.repository.findById(userId);

      user.avatarUrl = avatarFile;

      await this.repository.create(user);

      return createServiceSuccess(null);
    } catch (error) {
      logger({
        error,
        type: 'DefaultError',
      });
      return error;
    }
  }
}
