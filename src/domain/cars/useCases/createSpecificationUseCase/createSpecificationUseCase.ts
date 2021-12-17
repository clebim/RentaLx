import {
  createServiceError,
  createServiceSuccess,
} from '../../../../common/domainResults/CreateServiceResults';
import { getFileName } from '../../../../common/domainResults/GetFileName';
import {
  Either,
  IServiceError,
} from '../../../../common/domainResults/interfaces';
import { logger } from '../../../../common/logger';
import { ISpecificationsRepository } from '../../infra/contracts/ISpecificationsRepository';
import { Specification } from '../../infra/entities/Specification';
import { ICreateSpecificationDTO } from '../../interfaces/ICreateSpecification';

export class CreateSpecificationUseCase {
  constructor(private repository: ISpecificationsRepository) {}

  private buildError(error, statusCode: 400 | 404 | 409) {
    return createServiceError<Specification>({
      message: error.message,
      statusCode,
    });
  }

  execute(
    createCategoryData: ICreateSpecificationDTO,
  ): Either<Specification, IServiceError> {
    try {
      const { data, isFailure, error } =
        this.repository.create(createCategoryData);

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
