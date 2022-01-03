import { getRepository, Repository } from 'typeorm';

import {
  createRepositoryError,
  createRepositorySuccess,
} from '../../../../commonMethods/domainResults/CreateRepositoryError';
import {
  Either,
  IRepositoryError,
} from '../../../../commonMethods/domainResults/interfaces';
import { logger } from '../../../../commonMethods/logger';
import { ICreateSpecificationDTO } from '../../interfaces/specifications/ICreateSpecification';
import { ISpecificationsRepository } from '../contracts/ISpecificationsRepository';
import { Specification } from '../entities/Specification';

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  private buildError(message: string) {
    return createRepositoryError({
      message,
      repository: 'SpecificationRepository',
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
      });
      return this.buildError('Error inserting category in database');
    }
  }
}
