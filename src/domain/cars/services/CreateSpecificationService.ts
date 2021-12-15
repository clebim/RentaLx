import { Either, IServiceError } from '../../../common/domainResults';
import { createDomainResult } from '../../../common/domainResults/CreateDomainResults';
import { logger } from '../../../common/logger';
import { ISpecificationsRepository } from '../infra/contracts/ISpecificationsRepository';
import { Specification } from '../infra/entities/Specification';
import { ICreateSpecificationDTO } from '../interfaces/ICreateSpecification';

export class CreateSpecificationService {
  constructor(private repository: ISpecificationsRepository) {}

  private buildError(error, statusCode: 400 | 404 | 409) {
    return createDomainResult<Specification, IServiceError>(
      {
        message: error.message,
        statusCode,
      },
      true,
    );
  }

  execute(
    createCategoryData: ICreateSpecificationDTO,
  ): Either<Specification, IServiceError> {
    try {
      const { value, isFailure, error } =
        this.repository.create(createCategoryData);

      if (isFailure) {
        this.buildError(error, 400);
      }

      return createDomainResult<Specification, IServiceError>(value, false);
    } catch (error) {
      logger({
        error,
        type: 'DefaultError',
      });
      return this.buildError(error, 400);
    }
  }
}
