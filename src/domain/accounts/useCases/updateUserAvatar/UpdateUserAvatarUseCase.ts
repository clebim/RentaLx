import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../commonMethods/deleteFile';
import { createServiceSuccess } from '../../../../commonMethods/domainResults/CreateServiceResults';
import {
  Either,
  IServiceError,
} from '../../../../commonMethods/domainResults/interfaces';
import { logger } from '../../../../commonMethods/logger';
import { pathToTmpAvatar } from '../../../../config/Multer';
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
