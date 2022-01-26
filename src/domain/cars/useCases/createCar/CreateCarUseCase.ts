import { injectable, inject } from 'tsyringe';

import {
  Either,
  IUseCaseError,
} from '../../../../helpers/domainResults/interfaces';
import { UseCase } from '../../../../shared/base/UseCase';
import { ICarsRepository } from '../../infra/contracts/ICarsRepository';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICreateCarDTO } from '../../interfaces/cars/ICreateCar';

@injectable()
export class CreateCarUseCase extends UseCase {
  constructor(
    @inject('CarsRepository')
    private repository: ICarsRepository,
  ) {
    super();
  }

  private async carAlreadyExists(licensePlate: string): Promise<boolean> {
    try {
      const { data } = await this.repository.findByLicensePlate(licensePlate);

      return !!data;
    } catch (error) {
      this.logger({
        error,
        type: 'DefaultError',
      });
      return false;
    }
  }

  public async execute(
    createCarProps: ICreateCarDTO,
  ): Promise<Either<Car, IUseCaseError>> {
    try {
      const { licensePlate } = createCarProps;

      const carExists = await this.carAlreadyExists(licensePlate);

      if (carExists) {
        return this.buildError({
          message: 'License plate already registered in platform',
          statusCode: 400,
        });
      }

      const { data, isFailure, error } = await this.repository.createOrSave(
        createCarProps,
      );

      if (isFailure) {
        return this.buildError({ message: error.message, statusCode: 400 });
      }

      return this.buildSuccess<Car>(data);
    } catch (error) {
      this.logger({
        error,
        type: 'FatalError',
      });
      return error;
    }
  }
}
