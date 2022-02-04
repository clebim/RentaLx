import { injectable, inject } from 'tsyringe';

import {
  Either,
  IUseCaseError,
} from '../../../../helpers/domainResults/interfaces';
import { UseCase } from '../../../../shared/base/UseCase';
import { ICategoriesRepository } from '../../infra/contracts/ICategoriesRepository';
import { Category } from '../../infra/typeorm/entities/Category';
import { ICreateCategoryDTO } from '../../interfaces/categories/ICreateCategory';

@injectable()
export class CreateCategoryUseCase extends UseCase {
  constructor(
    @inject('CategoriesRepository')
    private repository: ICategoriesRepository,
  ) {
    super();
  }

  async categoryAlreadyExists(category: string): Promise<boolean> {
    try {
      const { data } = await this.repository.findByName(category);

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
    createCategoryData: ICreateCategoryDTO,
  ): Promise<Either<IUseCaseError, Category>> {
    try {
      const { name } = createCategoryData;

      if (await this.categoryAlreadyExists(name)) {
        return this.left({
          message: 'Category already registered on the platform',
          statusCode: 400,
        });
      }

      const { data, isFailure, error } = await this.repository.create(
        createCategoryData,
      );

      if (isFailure) {
        return this.left({
          message: error.message,
          statusCode: 400,
        });
      }

      return this.right<Category>(data);
    } catch (error) {
      this.logger({
        error,
        type: 'FatalError',
      });
      return error;
    }
  }
}
