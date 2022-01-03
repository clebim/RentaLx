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

  async list(): Promise<Either<Category[], IRepositoryError>> {
    try {
      const categories = await this.repository.find();

      return createRepositorySuccess<Category[]>(categories);
    } catch (error) {
      logger({
        type: 'DatabaseError',
        error,
      });
      return this.buildError('Error list categories in database');
    }
  }

  async findByName(
    name: string,
  ): Promise<Either<Category[], IRepositoryError>> {
    try {
      const categories = await this.repository.find({
        where: {
          name,
        },
      });

      return createRepositorySuccess<Category[]>(categories);
    } catch (error) {
      logger({
        type: 'DatabaseError',
        error,
      });
      return this.buildError('Error list categories by name in database');
    }
  }
}
