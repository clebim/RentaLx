import { injectable, inject } from 'tsyringe';

import {
  Either,
  IUseCaseError,
} from '../../../../helpers/domainResults/interfaces';
import { UseCaseBase } from '../../../../shared/base/UseCaseBase';
import { ISpecificationsRepository } from '../../infra/contracts/ISpecificationsRepository';
import { Specification } from '../../infra/typeorm/entities/Specification';
import { ICreateSpecificationDTO } from '../../interfaces/specifications/ICreateSpecification';

@injectable()
export class CreateSpecificationUseCase extends UseCaseBase {
  constructor(
    @inject('SpecificationsRepository')
    private repository: ISpecificationsRepository,
  ) {
    super();
  }

  async execute(
    createCategoryData: ICreateSpecificationDTO,
  ): Promise<Either<Specification, IUseCaseError>> {
    try {
      const { data, isFailure, error } = await this.repository.create(
        createCategoryData,
      );

      if (isFailure) {
        return this.buildError({
          message: error.message,
          statusCode: 400,
        });
      }

      return this.buildSuccess<Specification>(data);
    } catch (error) {
      this.logger({
        error,
        type: 'FatalError',
      });
      return error;
    }
  }
}
