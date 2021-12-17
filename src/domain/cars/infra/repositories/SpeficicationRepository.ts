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

  private static INSTANCE: SpecificationRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): ISpecificationsRepository {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }

    return SpecificationRepository.INSTANCE;
  }

  private buildError<T>(message: string) {
    return createRepositoryError<T>({
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
      return this.buildError<Specification>(
        'Error inserting category in database',
      );
    }
  }
}
