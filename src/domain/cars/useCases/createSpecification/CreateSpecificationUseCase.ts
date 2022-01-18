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
import { ISpecificationsRepository } from '../../infra/contracts/ISpecificationsRepository';
import { Specification } from '../../infra/typeorm/entities/Specification';
import { ICreateSpecificationDTO } from '../../interfaces/specifications/ICreateSpecification';

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private repository: ISpecificationsRepository,
  ) {}

  private buildError(error, statusCode: 400 | 404 | 409) {
    return createServiceError({
      message: error.message,
      statusCode,
    });
  }

  async execute(
    createCategoryData: ICreateSpecificationDTO,
  ): Promise<Either<Specification, IServiceError>> {
    try {
      const { data, isFailure, error } = await this.repository.create(
        createCategoryData,
      );

      if (isFailure) {
        return this.buildError(error, 400);
      }

      return createServiceSuccess<Specification>(data);
    } catch (error) {
      logger({
        error,
        type: 'DefaultError',
      });
      return error;
    }
  }
}
