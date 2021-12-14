import { ICategoriesRepository } from '../infra/contracts/ICategoriesRepository';
import { Category } from '../infra/entities/Category';
import { ICreateCategoryDTO } from '../interfaces/ICreateCategory';

export class CreateCategoryService {
  constructor(private repository: ICategoriesRepository) {}

  execute(createCategoryData: ICreateCategoryDTO): Category {
    const createdCategory = this.repository.create(createCategoryData);

    return createdCategory;
  }
}
