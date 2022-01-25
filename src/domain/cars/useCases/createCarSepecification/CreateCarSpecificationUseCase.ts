import { inject, injectable } from 'tsyringe';

import {
  Either,
  IUseCaseError,
} from '../../../../helpers/domainResults/interfaces';
import { UseCaseBase } from '../../../../shared/base/UseCaseBase';
import { ICarsRepository } from '../../infra/contracts/ICarsRepository';
import { ISpecificationsRepository } from '../../infra/contracts/ISpecificationsRepository';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICreateCarSpecificationDTO } from '../../interfaces/carsSpecification/ICreateCarSpecification';

@injectable()
export class CreateCarSpecificationUseCase extends UseCaseBase {
  constructor(
    @inject('CarsRepository')
    private carRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository,
  ) {
    super();
  }

  private async carAlreadyExists(id: string): Promise<Car | undefined> {
    try {
      const { data } = await this.carRepository.findById(id);

      return data;
    } catch (error) {
      this.logger({
        error,
        type: 'DefaultError',
      });
      return undefined;
    }
  }

  async execute({
    carId,
    specificationsId,
  }: ICreateCarSpecificationDTO): Promise<Either<Car, IUseCaseError>> {
    try {
      const carAlreadyExists = await this.carAlreadyExists(carId);

      if (!carAlreadyExists) {
        return this.buildError({
          message: 'Car does not exists',
          statusCode: 400,
        });
      }

      const {
        data: specifications,
        isFailure,
        error,
      } = await this.specificationRepository.findByIds(specificationsId);

      if (isFailure) {
        return this.buildError({
          message: error.message,
          statusCode: 400,
        });
      }

      if (specifications.length === 0) {
        return this.buildError({
          message: 'Spefications does not exists',
          statusCode: 400,
        });
      }

      carAlreadyExists.specifications = specifications;

      await this.carRepository.createOrSave(carAlreadyExists);

      return this.buildSuccess<Car>(carAlreadyExists);
    } catch (error) {
      this.logger({
        error,
        type: 'FatalError',
      });
      return error;
    }
  }
}
