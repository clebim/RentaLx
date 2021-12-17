import {
  createRepositoryError,
  createRepositorySuccess,
} from '../../../../common/domainResults/CreateRepositoryError';
import { getFileName } from '../../../../common/domainResults/GetFileName';
import {
  Either,
  IRepositoryError,
} from '../../../../common/domainResults/interfaces';
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
    return createRepositoryError<Specification>({
      message,
      repository: getFileName().split('.')[0],
    });
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
      return createRepositorySuccess<Specification>(specification);
    } catch (error) {
      logger({
        type: 'DatabaseError',
        error,
        fileName: getFileName(),
      });
      return this.buildError('Error inserting category in database');
    }
  }
}
