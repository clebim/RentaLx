import { parse, Parser } from 'csv-parse';
import fs from 'fs';

import {
  createServiceError,
  createServiceSuccess,
} from '../../../../common/domainResults/CreateServiceResults';
import { getFileName } from '../../../../common/domainResults/GetFileName';
import {
  Either,
  IServiceError,
} from '../../../../common/domainResults/interfaces';
import { logger } from '../../../../common/logger';
import { ICategoriesRepository } from '../../infra/contracts/ICategoriesRepository';

type IImportCategory = {
  name: string;
  description: string;
};

export class ImportCategoryUseCase {
  private parseFile: Parser;
  private categories: IImportCategory[];

  constructor(private repository: ICategoriesRepository) {
    this.parseFile = parse();
    this.categories = [];
  }

  private buildError(error, statusCode: 400 | 404 | 409) {
    return createServiceError({
      message: error.message,
      statusCode,
    });
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
        return createServiceError<null>({
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
          .on('error', error => reject(error));
      });

      this.categories.forEach(category => {
        const { name, description } = category;
        this.repository.create({
          name,
          description,
        });
      });

      return createServiceSuccess(null);
    } catch (error) {
      logger({
        error,
        type: 'DefaultError',
        fileName: getFileName(),
      });
      return error;
    }
  }
}
