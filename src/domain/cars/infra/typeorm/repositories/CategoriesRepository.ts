import { getRepository, Repository as TypeOrmRepository } from 'typeorm';

import {
  Either,
  IRepositoryError,
} from '../../../../../helpers/domainResults/interfaces';
import { Repository } from '../../../../../shared/base/Repository';
import { ICreateCategoryDTO } from '../../../interfaces/categories/ICreateCategory';
import { IListCategoriesDTO } from '../../../interfaces/categories/IListCategories';
import { ICategoriesRepository } from '../../contracts/ICategoriesRepository';
import { Category } from '../entities/Category';

export class CategoriesRepository
  extends Repository
  implements ICategoriesRepository
{
  private repository: TypeOrmRepository<Category>;

  constructor() {
    super('CategoriesRepository');
    this.repository = getRepository(Category);
  }

  async create(
    createCategoryData: ICreateCategoryDTO,
  ): Promise<Either<IRepositoryError, Category>> {
    try {
      const { name, description } = createCategoryData;

      const category = this.repository.create({
        name,
        description,
      });

      await this.repository.save(category);

      return this.right<Category>(category);
    } catch (error) {
      return this.left({
        error,
        message: 'Error inserting category in database',
      });
    }
  }

  async list(
    listCategoriesProps: IListCategoriesDTO,
  ): Promise<Either<IRepositoryError, [Category[], number]>> {
    const { name, description, order, page, totalItemsPerPage } =
      listCategoriesProps;

    try {
      const query = this.repository
        .createQueryBuilder('category')
        .where('category.id is not null');

      if (name) {
        query.andWhere('category.name LIKE :name', { name: `%${name}%` });
      }

      if (description) {
        query.andWhere('category.description LIKE :description', {
          description: `%${description}%`,
        });
      }

      if (order) {
        query.orderBy('category.name', order);
      }

      if (page && totalItemsPerPage) {
        query.skip((page - 1) * totalItemsPerPage).take(totalItemsPerPage);
      }

      const responseQuery = await query.getManyAndCount();

      return this.right<[Category[], number]>(responseQuery);
    } catch (error) {
      return this.left({
        error,
        message: 'Error list categories in database',
      });
    }
  }

  async findByName(name: string): Promise<Either<IRepositoryError, Category>> {
    try {
      const category = await this.repository.findOne({
        where: {
          name,
        },
      });

      return this.right<Category>(category);
    } catch (error) {
      return this.left({
        error,
        message: 'Error list categories by name in database',
      });
    }
  }
}
