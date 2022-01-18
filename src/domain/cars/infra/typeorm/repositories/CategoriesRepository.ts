import { getRepository, Repository } from 'typeorm';

import {
  Either,
  IRepositoryError,
} from '../../../../../helpers/domainResults/interfaces';
import { RepositoryBase } from '../../../../../shared/base/RepositoryBase';
import { ICreateCategoryDTO } from '../../../interfaces/categories/ICreateCategory';
import { IListCategoriesProps } from '../../../interfaces/categories/IListCategoriesProps';
import { ICategoriesRepository } from '../../contracts/ICategoriesRepository';
import { Category } from '../entities/Category';

export class CategoriesRepository
  extends RepositoryBase
  implements ICategoriesRepository
{
  private repository: Repository<Category>;

  constructor() {
    super('CategoriesRepository');
    this.repository = getRepository(Category);
  }

  async create(
    createCategoryData: ICreateCategoryDTO,
  ): Promise<Either<Category, IRepositoryError>> {
    try {
      const { name, description } = createCategoryData;

      const category = this.repository.create({
        name,
        description,
      });

      await this.repository.save(category);

      return this.buildSuccess<Category>(category);
    } catch (error) {
      return this.buildError({
        error,
        message: 'Error inserting category in database',
      });
    }
  }

  async list(
    listCategoriesProps: IListCategoriesProps,
  ): Promise<Either<[Category[], number], IRepositoryError>> {
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

      return this.buildSuccess<[Category[], number]>(responseQuery);
    } catch (error) {
      return this.buildError({
        error,
        message: 'Error list categories in database',
      });
    }
  }

  async findByName(name: string): Promise<Either<Category, IRepositoryError>> {
    try {
      const category = await this.repository.findOne({
        where: {
          name,
        },
      });

      return this.buildSuccess<Category>(category);
    } catch (error) {
      return this.buildError({
        error,
        message: 'Error list categories by name in database',
      });
    }
  }
}
