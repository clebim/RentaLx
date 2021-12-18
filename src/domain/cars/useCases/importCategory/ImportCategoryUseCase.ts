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
    console.log(line);

    this.categories.push({
      name,
      description,
    });
  }

  async execute(
    file: Express.Multer.File,
  ): Promise<Either<IImportCategory[], IServiceError>> {
    try {
      const stream = fs.createReadStream(file.path);

      stream.pipe(this.parseFile);

      await new Promise((resolve, reject) => {
        this.parseFile
          .on('data', line => this.proccessImportLine(line))
          .on('end', () => resolve(this.categories))
          .on('error', error => reject(error));
      });

      console.log(this.categories);

      return createServiceSuccess(this.categories);
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
