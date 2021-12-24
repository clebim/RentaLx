import { getRepository, Repository } from 'typeorm';

import {
  createRepositoryError,
  createRepositorySuccess,
} from '../../../../common-methods/domainResults/CreateRepositoryError';
import { getFileName } from '../../../../common-methods/domainResults/GetFileName';
import {
  Either,
  IRepositoryError,
} from '../../../../common-methods/domainResults/interfaces';
import { logger } from '../../../../common-methods/logger';
import { ICreateCategoryDTO } from '../../interfaces/ICreateCategory';
import { ICategoriesRepository } from '../contracts/ICategoriesRepository';
import { Category } from '../entities/Category';

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  private buildError<T>(message: string) {
    return createRepositoryError<T>({
      message,
      repository: getFileName().split('.')[0],
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
        fileName: getFileName(),
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
        fileName: getFileName(),
      });
      return this.buildError<Category[]>('Error list categories in database');
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
        fileName: getFileName(),
      });
      return this.buildError<Category[]>(
        'Error list categories by name in database',
      );
    }
  }
}
