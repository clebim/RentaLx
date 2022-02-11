import { differenceInHours, parseISO } from 'date-fns';
import { format, zonedTimeToUtc } from 'date-fns-tz';
import { inject, injectable } from 'tsyringe';

import {
  Either,
  IUseCaseError,
} from '../../../helpers/domainResults/interfaces';
import { UseCase } from '../../../shared/base/UseCase';
import { IRentalRepository } from '../infra/typeorm/contracts/IRentalRepository';
import { Rental } from '../infra/typeorm/entities/Rental';
import { ICreateRentalDTO } from '../interfaces/rental/ICreateRental';

@injectable()
export class CreateRentalUseCase extends UseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalRepository: IRentalRepository,
  ) {
    super();
  }

  private parseDateToTimezoneSp(date: string, timeZone: string) {
    const zonedDate = zonedTimeToUtc(parseISO(date), timeZone);

    return format(zonedDate, 'yyyy-MM-dd HH:mm:ss', {
      timeZone: 'America/Sao_Paulo',
    });
  }

  async execute(
    createRental: ICreateRentalDTO,
    timeZone = 'America/Sao_Paulo',
  ): Promise<Either<IUseCaseError, Rental>> {
    try {
      const { carId, startDate, userId, expectReturnDate } = createRental;

      const startUtcSpDate = this.parseDateToTimezoneSp(startDate, timeZone);
      const expectUtcSpDate = this.parseDateToTimezoneSp(
        expectReturnDate,
        timeZone,
      );

      const responseRentalsByCar = await this.rentalRepository.list({
        carId,
        startDate: startUtcSpDate,
      });

      if (responseRentalsByCar.isFailure) {
        return this.left({
          message: responseRentalsByCar.error.message,
          statusCode: 400,
        });
      }

      const { data: rentalsByCar } = responseRentalsByCar;

      const carIsRented = rentalsByCar[0].find(
        rental => rental.endDate === null,
      );

      if (carIsRented) {
        return this.left({
          message: 'Car is already rented',
          statusCode: 400,
        });
      }

      const {
        data: rentalsByUser,
        error,
        isFailure,
      } = await this.rentalRepository.list({
        userId,
        startDate: startUtcSpDate,
      });

      if (isFailure) {
        return this.left({
          message: error.message,
          statusCode: 400,
        });
      }

      const userHasRentalACar = rentalsByUser[0].find(
        rental => rental.endDate === null,
      );

      if (userHasRentalACar) {
        return this.left({
          message: 'User has already rented a car',
          statusCode: 400,
        });
      }

      const diffInHours = differenceInHours(
        parseISO(expectReturnDate),
        parseISO(startDate),
      );

      if (diffInHours < 24) {
        return this.left({
          message: 'Rental time must be at least 24 hours',
          statusCode: 400,
        });
      }

      const { data: newRental } = await this.rentalRepository.createOrSave({
        ...createRental,
        startDate: startUtcSpDate,
        expectReturnDate: expectUtcSpDate,
      });

      return this.right(newRental);
    } catch (error) {
      this.logger({
        error,
        type: 'FatalError',
      });
      return error;
    }
  }
}
