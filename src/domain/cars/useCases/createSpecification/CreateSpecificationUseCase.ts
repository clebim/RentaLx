import { injectable, inject } from 'tsyringe';

import {
  Either,
  IUseCaseError,
} from '../../../../helpers/domainResults/interfaces';
import { UseCase } from '../../../../shared/base/UseCase';
import { ISpecificationsRepository } from '../../infra/contracts/ISpecificationsRepository';
import { Specification } from '../../infra/typeorm/entities/Specification';
import { ICreateSpecificationDTO } from '../../interfaces/specifications/ICreateSpecification';

@injectable()
export class CreateSpecificationUseCase extends UseCase {
  constructor(
    @inject('SpecificationsRepository')
    private repository: ISpecificationsRepository,
  ) {
    super();
  }

  async execute(
    createCategoryData: ICreateSpecificationDTO,
  ): Promise<Either<IUseCaseError, Specification>> {
    try {
      const { data, isFailure, error } = await this.repository.create(
        createCategoryData,
      );

      if (isFailure) {
        return this.left({
          message: error.message,
          statusCode: 400,
        });
      }

      return this.right<Specification>(data);
    } catch (error) {
      this.logger({
        error,
        type: 'FatalError',
      });
      return error;
    }
  }
}
