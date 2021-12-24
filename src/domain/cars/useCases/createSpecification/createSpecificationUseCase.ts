import { injectable, inject } from 'tsyringe';

import {
  createServiceError,
  createServiceSuccess,
} from '../../../../common-methods/domainResults/CreateServiceResults';
import { getFileName } from '../../../../common-methods/domainResults/GetFileName';
import {
  Either,
  IServiceError,
} from '../../../../common-methods/domainResults/interfaces';
import { logger } from '../../../../common-methods/logger';
import { ISpecificationsRepository } from '../../infra/contracts/ISpecificationsRepository';
import { Specification } from '../../infra/entities/Specification';
import { ICreateSpecificationDTO } from '../../interfaces/ICreateSpecification';

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private repository: ISpecificationsRepository,
  ) {}

  private buildError(error, statusCode: 400 | 404 | 409) {
    return createServiceError<Specification>({
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
        this.buildError(error, 400);
      }

      return createServiceSuccess<Specification>(data);
    } catch (error) {
      logger({
        error,
        type: 'DefaultError',
        fileName: getFileName(),
      });
      return error;
    }
  }
}
