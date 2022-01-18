import { parse, Parser } from 'csv-parse';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import {
  Either,
  IUseCaseError,
} from '../../../../helpers/domainResults/interfaces';
import { UseCaseBase } from '../../../../shared/base/UseCaseBase';
import { ICategoriesRepository } from '../../infra/contracts/ICategoriesRepository';

type IImportCategory = {
  name: string;
  description: string;
};
@injectable()
export class ImportCategoryUseCase extends UseCaseBase {
  private parseFile: Parser;
  private categories: IImportCategory[];

  constructor(
    @inject('CategoriesRepository')
    private repository: ICategoriesRepository,
  ) {
    super();
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
  ): Promise<Either<null, IUseCaseError>> {
    try {
      if (!file) {
        return this.buildError({
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

      return this.buildSuccess(null);
    } catch (error) {
      this.logger({
        error,
        type: 'DefaultError',
      });
      return error;
    }
  }
}
