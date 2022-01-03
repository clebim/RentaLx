import {
  Either,
  IRepositoryError,
} from '../../../../commonMethods/domainResults/interfaces';
import { ICreateSpecificationDTO } from '../../interfaces/specifications/ICreateSpecification';
import { Specification } from '../entities/Specification';

export interface ISpecificationsRepository {
  create(
    createSpecificationData: ICreateSpecificationDTO,
  ): Promise<Either<Specification, IRepositoryError>>;
}
