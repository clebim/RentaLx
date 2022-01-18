import { injectable, inject } from 'tsyringe';

import {
  Either,
  IUseCaseError,
} from '../../../../helpers/domainResults/interfaces';
import { UseCaseBase } from '../../../../shared/base/UseCaseBase';
import { ICategoriesRepository } from '../../infra/contracts/ICategoriesRepository';
import { Category } from '../../infra/typeorm/entities/Category';
import { ICreateCategoryDTO } from '../../interfaces/categories/ICreateCategory';

@injectable()
export class CreateCategoryUseCase extends UseCaseBase {
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
  ): Promise<Either<Category, IUseCaseError>> {
    try {
      const { name } = createCategoryData;

      if (await this.categoryAlreadyExists(name)) {
        return this.buildError({
          message: 'Category already registered on the platform',
          statusCode: 400,
        });
      }

      const { data, isFailure, error } = await this.repository.create(
        createCategoryData,
      );

      if (isFailure) {
        return this.buildError({
          message: error.message,
          statusCode: 400,
        });
      }

      return this.buildSuccess<Category>(data);
    } catch (error) {
      this.logger({
        error,
        type: 'DefaultError',
      });
      return error;
    }
  }
}
