import {
  Either,
  IRepositoryError,
} from '../../../../helpers/domainResults/interfaces';
import { ICreateSpecificationDTO } from '../../interfaces/specifications/ICreateSpecification';
import { Specification } from '../typeorm/entities/Specification';

export interface ISpecificationsRepository {
  create(
    createSpecificationData: ICreateSpecificationDTO,
  ): Promise<Either<Specification, IRepositoryError>>;
  findByIds(ids: string[]): Promise<Either<Specification[], IRepositoryError>>;
}
