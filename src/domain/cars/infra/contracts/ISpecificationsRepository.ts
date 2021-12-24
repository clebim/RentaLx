import {
  Either,
  IRepositoryError,
} from '../../../../common-methods/domainResults/interfaces';
import { ICreateSpecificationDTO } from '../../interfaces/ICreateSpecification';
import { Specification } from '../entities/Specification';

export interface ISpecificationsRepository {
  create(
    createSpecificationData: ICreateSpecificationDTO,
  ): Promise<Either<Specification, IRepositoryError>>;
}
