import { inject, injectable } from 'tsyringe';

import { pathToTmpAvatar } from '../../../../api/config/Multer';
import { deleteFile } from '../../../../helpers/deleteFile';
import {
  Either,
  IUseCaseError,
} from '../../../../helpers/domainResults/interfaces';
import { UseCase } from '../../../../shared/base/UseCase';
import { IUsersRepository } from '../../infra/contracts/IUsersRepository';
import { IUpdateUserAvatarDTO } from '../../interfaces/user/IUpdateUserAvatar';

@injectable()
export class UpdateUserAvatarUseCase extends UseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {
    super();
  }

  async execute({
    userId,
    avatarFile,
  }: IUpdateUserAvatarDTO): Promise<Either<IUseCaseError, null>> {
    try {
      const { data: user } = await this.repository.findById(userId);

      if (user.avatarUrl) {
        await deleteFile(`${pathToTmpAvatar}/${user.avatarUrl}`);
      }

      user.avatarUrl = avatarFile;

      await this.repository.createOrSave(user);

      return this.right(null);
    } catch (error) {
      this.logger({
        error,
        type: 'FatalError',
      });
      return error;
    }
  }
}
