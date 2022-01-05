import { parse, Parser } from 'csv-parse';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import {
  createServiceError,
  createServiceSuccess,
} from '../../../../commonMethods/domainResults/CreateServiceResults';
import {
  Either,
  IServiceError,
} from '../../../../commonMethods/domainResults/interfaces';
import { logger } from '../../../../commonMethods/logger';
import { ICategoriesRepository } from '../../infra/contracts/ICategoriesRepository';

type IImportCategory = {
  name: string;
  description: string;
};
@injectable()
export class ImportCategoryUseCase {
  private parseFile: Parser;
  private categories: IImportCategory[];

  constructor(
    @inject('CategoriesRepository')
    private repository: ICategoriesRepository,
  ) {
    this.parseFile = parse();
    this.categories = [];
  }

  private proccessImportLine(line: string[]): void {
    const [name, description] = line;

    this.categories.push({
      name,
      description,
    });
  }

  async execute(
    file: Express.Multer.File,
  ): Promise<Either<null, IServiceError>> {
    try {
      if (!file) {
        return createServiceError({
          statusCode: 400,
          message: 'does not contain file',
        });
      }

      const stream = fs.createReadStream(file.path);

      stream.pipe(this.parseFile);

      await new Promise((resolve, reject) => {
        this.parseFile
          .on('data', line => this.proccessImportLine(line))
          .on('end', () => {
            fs.promises.unlink(file.path);
            resolve(this.categories);
          })
          .on('error', error => {
            console.log(error);
            reject(error);
          });
      });

      this.categories.forEach(async category => {
        const { name, description } = category;
        await this.repository.create({
          name,
          description,
        });
      });

      return createServiceSuccess(null);
    } catch (error) {
      logger({
        error,
        type: 'DefaultError',
      });
      return error;
    }
  }
}
