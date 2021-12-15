import { Either, IRepositoryError } from '../../../../common/domainResults';
import { ICreateSpecificationDTO } from '../../interfaces/ICreateSpecification';
import { Specification } from '../entities/Specification';

export interface ISpecificationsRepository {
  create(
    createSpecificationData: ICreateSpecificationDTO,
  ): Either<Specification, IRepositoryError>;
}
