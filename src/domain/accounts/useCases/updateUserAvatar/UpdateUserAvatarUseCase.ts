import { inject, injectable } from 'tsyringe';

import { pathToTmpAvatar } from '../../../../api/config/Multer';
import { deleteFile } from '../../../../helpers/deleteFile';
import {
  Either,
  IUseCaseError,
} from '../../../../helpers/domainResults/interfaces';
import { UseCaseBase } from '../../../../shared/base/UseCaseBase';
import { IUsersRepository } from '../../infra/contracts/IUsersRepository';
import { IUpdateUserAvatarDTO } from '../../interfaces/user/IUpdateUserAvatar';

@injectable()
export class UpdateUserAvatarUseCase extends UseCaseBase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {
    super();
  }

  async execute({
    userId,
    avatarFile,
  }: IUpdateUserAvatarDTO): Promise<Either<null, IUseCaseError>> {
    try {
      const { data: user } = await this.repository.findById(userId);

      if (user.avatarUrl) {
        await deleteFile(`${pathToTmpAvatar}/${user.avatarUrl}`);
      }

      user.avatarUrl = avatarFile;

      await this.repository.createOrSave(user);

      return this.buildSuccess(null);
    } catch (error) {
      this.logger({
        error,
        type: 'DefaultError',
      });
      return error;
    }
  }
}
