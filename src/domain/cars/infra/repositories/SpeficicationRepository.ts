import { getRepository, Repository } from 'typeorm';

import {
  createRepositoryError,
  createRepositorySuccess,
} from '../../../../common-methods/domainResults/CreateRepositoryError';
import { getFileName } from '../../../../common-methods/domainResults/GetFileName';
import {
  Either,
  IRepositoryError,
} from '../../../../common-methods/domainResults/interfaces';
import { logger } from '../../../../common-methods/logger';
import { ICreateSpecificationDTO } from '../../interfaces/ICreateSpecification';
import { ISpecificationsRepository } from '../contracts/ISpecificationsRepository';
import { Specification } from '../entities/Specification';

export class SpecificationRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  private buildError<T>(message: string) {
    return createRepositoryError<T>({
      message,
      repository: getFileName().split('.')[0],
    });
  }

  async create(
    createSpecificationData: ICreateSpecificationDTO,
  ): Promise<Either<Specification, IRepositoryError>> {
    try {
      const { name, description } = createSpecificationData;

      const specification = this.repository.create({ name, description });

      await this.repository.save(specification);
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
