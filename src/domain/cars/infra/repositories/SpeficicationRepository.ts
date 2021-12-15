import { Either, IRepositoryError } from '../../../../common/domainResults';
import { createDomainResult } from '../../../../common/domainResults/CreateDomainResults';
import { logger } from '../../../../common/logger';
import { ICreateSpecificationDTO } from '../../interfaces/ICreateSpecification';
import { ISpecificationsRepository } from '../contracts/ISpecificationsRepository';
import { Specification } from '../entities/Specification';

export class SpecificationRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  private buildError(message: string) {
    return createDomainResult<Specification, IRepositoryError>(
      {
        message,
      },
      true,
    );
  }

  create(
    createSpecificationData: ICreateSpecificationDTO,
  ): Either<Specification, IRepositoryError> {
    try {
      const { name, description } = createSpecificationData;

      const specification = new Specification();

      Object.assign(specification, {
        name,
        description,
        createdAt: new Date(),
      });

      this.specifications.push(specification);
      return createDomainResult<Specification, IRepositoryError>(
        specification,
        false,
      );
    } catch (error) {
      logger({
        type: 'DatabaseError',
        error,
      });
      return this.buildError('Error inserting category in database');
    }
  }
}
