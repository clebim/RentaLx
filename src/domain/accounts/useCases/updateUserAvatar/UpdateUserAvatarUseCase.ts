import { inject, injectable } from 'tsyringe';

import { pathToTmpAvatar } from '../../../../api/config/Multer';
import { deleteFile } from '../../../../helpers/deleteFile';
import { createUseCaseSuccess } from '../../../../helpers/domainResults/CreateUseCaseResults';
import {
  Either,
  IServiceError,
} from '../../../../helpers/domainResults/interfaces';
import { logger } from '../../../../helpers/logger';
import { IUsersRepository } from '../../infra/contracts/IUsersRepository';
import { IUpdateUserAvatarDTO } from '../../interfaces/user/IUpdateUserAvatar';

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  async execute({
    userId,
    avatarFile,
  }: IUpdateUserAvatarDTO): Promise<Either<null, IServiceError>> {
    try {
      const { data: user } = await this.repository.findById(userId);

      if (user.avatarUrl) {
        await deleteFile(`${pathToTmpAvatar}/${user.avatarUrl}`);
      }

      user.avatarUrl = avatarFile;

      await this.repository.createOrSave(user);

      return createUseCaseSuccess(null);
    } catch (error) {
      logger({
        error,
        type: 'DefaultError',
      });
      return error;
    }
  }
}
