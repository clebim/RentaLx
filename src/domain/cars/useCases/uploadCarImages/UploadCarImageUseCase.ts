import { inject, injectable } from 'tsyringe';

import {
  Either,
  IUseCaseError,
} from '../../../../helpers/domainResults/interfaces';
import { UseCase } from '../../../../shared/base/UseCase';
import { ICarImageRepository } from '../../infra/contracts/ICarImageRepository';
import { ICarsRepository } from '../../infra/contracts/ICarsRepository';
import { ICreateCarImageDTO } from '../../interfaces/cars/ICreateCarImage';

@injectable()
export class UploadCarImageUseCase extends UseCase {
  constructor(
    @inject('CarImageRepository')
    private carImageRepository: ICarImageRepository,
    @inject('CarsRepository')
    private carRepository: ICarsRepository,
  ) {
    super();
  }

  private async carAlreadyExists(id: string): Promise<boolean> {
    try {
      const { data } = await this.carRepository.findById(id);

      return !!data;
    } catch (error) {
      this.logger({
        error,
        type: 'DefaultError',
      });
      return false;
    }
  }

  async execute(
    createCarImageProps: ICreateCarImageDTO,
  ): Promise<Either<IUseCaseError, string>> {
    try {
      const { carId } = createCarImageProps;

      const carAlreadyExists = await this.carAlreadyExists(carId);

      if (!carAlreadyExists) {
        return this.left({
          message: 'Car does not exists',
          statusCode: 400,
        });
      }

      const { isFailure, error, data } =
        await this.carImageRepository.createOrSave(createCarImageProps);

      if (isFailure) {
        return this.left({
          message: error.message,
          statusCode: 400,
        });
      }

      return this.right<string>(data.id);
    } catch (error) {
      this.logger({
        error,
        type: 'FatalError',
      });
      return error;
    }
  }
}
