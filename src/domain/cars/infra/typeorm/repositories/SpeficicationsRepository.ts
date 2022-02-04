import { getRepository, Repository as TypeOrmRepository } from 'typeorm';

import {
  Either,
  IRepositoryError,
} from '../../../../../helpers/domainResults/interfaces';
import { Repository } from '../../../../../shared/base/Repository';
import { ICreateSpecificationDTO } from '../../../interfaces/specifications/ICreateSpecification';
import { ISpecificationsRepository } from '../../contracts/ISpecificationsRepository';
import { Specification } from '../entities/Specification';

export class SpecificationsRepository
  extends Repository
  implements ISpecificationsRepository
{
  private repository: TypeOrmRepository<Specification>;

  constructor() {
    super('SpecificationsRepositoru');
    this.repository = getRepository(Specification);
  }

  async findByIds(
    ids: string[],
  ): Promise<Either<IRepositoryError, Specification[]>> {
    try {
      const specifications = await this.repository.findByIds(ids);

      return this.right<Specification[]>(specifications);
    } catch (error) {
      return this.left({
        error,
        message: 'Error list specifications by ids',
      });
    }
  }

  async create(
    createSpecificationData: ICreateSpecificationDTO,
  ): Promise<Either<IRepositoryError, Specification>> {
    try {
      const { name, description } = createSpecificationData;

      const specification = this.repository.create({ name, description });

      await this.repository.save(specification);
      return this.right<Specification>(specification);
    } catch (error) {
      return this.left({
        error,
        message: 'Error inserting category in database',
      });
    }
  }
}
