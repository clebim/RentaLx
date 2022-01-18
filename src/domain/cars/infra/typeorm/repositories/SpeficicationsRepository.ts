import { getRepository, Repository } from 'typeorm';

import {
  Either,
  IRepositoryError,
} from '../../../../../helpers/domainResults/interfaces';
import { RepositoryBase } from '../../../../../shared/base/RepositoryBase';
import { ICreateSpecificationDTO } from '../../../interfaces/specifications/ICreateSpecification';
import { ISpecificationsRepository } from '../../contracts/ISpecificationsRepository';
import { Specification } from '../entities/Specification';

export class SpecificationsRepository
  extends RepositoryBase
  implements ISpecificationsRepository
{
  private repository: Repository<Specification>;

  constructor() {
    super('SpecificationsRepositoru');
    this.repository = getRepository(Specification);
  }

  async create(
    createSpecificationData: ICreateSpecificationDTO,
  ): Promise<Either<Specification, IRepositoryError>> {
    try {
      const { name, description } = createSpecificationData;

      const specification = this.repository.create({ name, description });

      await this.repository.save(specification);
      return this.buildSuccess<Specification>(specification);
    } catch (error) {
      return this.buildError({
        error,
        message: 'Error inserting category in database',
      });
    }
  }
}
