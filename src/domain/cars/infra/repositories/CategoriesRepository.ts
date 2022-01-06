import { getRepository, Repository } from 'typeorm';

import {
  createRepositoryError,
  createRepositorySuccess,
} from '../../../../commonMethods/domainResults/CreateRepositoryError';
import {
  Either,
  IRepositoryError,
} from '../../../../commonMethods/domainResults/interfaces';
import { logger } from '../../../../commonMethods/logger';
import { ICreateCategoryDTO } from '../../interfaces/categories/ICreateCategory';
import { IListCategoriesProps } from '../../interfaces/categories/IListCategoriesProps';
import { ICategoriesRepository } from '../contracts/ICategoriesRepository';
import { Category } from '../entities/Category';

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  private buildError(message: string) {
    return createRepositoryError({
      message,
      repository: 'CategoriesRepository',
    });
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

      return createRepositorySuccess<Category>(category);
    } catch (error) {
      logger({
        type: 'DatabaseError',
        error,
      });
      return this.buildError('Error inserting category in database');
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

      query.orderBy('category.name', order);

      query.skip((page - 1) * totalItemsPerPage).take(totalItemsPerPage);

      const responseQuery = await query.getManyAndCount();

      return createRepositorySuccess<[Category[], number]>(responseQuery);
    } catch (error) {
      logger({
        type: 'DatabaseError',
        error,
      });
      return this.buildError('Error list categories in database');
    }
  }

  async findByName(name: string): Promise<Either<Category, IRepositoryError>> {
    try {
      const category = await this.repository.findOne({
        where: {
          name,
        },
      });

      return createRepositorySuccess<Category>(category);
    } catch (error) {
      logger({
        type: 'DatabaseError',
        error,
      });
      return this.buildError('Error list categories by name in database');
    }
  }
}
