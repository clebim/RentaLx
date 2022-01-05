import fs from 'fs';

type CsvProps = string[];

type FileProps = {
  buffer: Buffer;
  fieldname: string;
  filename: string;
  path: string;
  size: number;
};

export class MockCsv {
  private dataWriteCsv: string;

  constructor() {
    this.dataWriteCsv = '';
  }

  private async getDataOldCsv(path: string): Promise<string> {
    try {
      await fs.promises.stat(path);
      const dataOldCsv = fs.readFileSync(path).toString();

      return dataOldCsv;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private async writeCsvFile(path: string, data: string) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, 'utf8', error => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  public async deleteCsv(path: string): Promise<void> {
    try {
      await fs.promises.stat(path);
    } catch (error) {
      throw new Error('file not exists');
    }

    await fs.promises.unlink(path);
  }

  public async mockCsv(
    path: string,
    data: CsvProps,
    concat = false,
  ): Promise<FileProps> {
    try {
      if (concat) {
        this.dataWriteCsv = await this.getDataOldCsv(path);
      }

      data.forEach(line => {
        this.dataWriteCsv += `${line} \n`;
      });

      await this.writeCsvFile(path, this.dataWriteCsv);

      const { size } = fs.statSync(path);

      const file = {
        buffer: Buffer.from(this.dataWriteCsv),
        fieldname: 'mockcsv',
        filename: path.split('/')[-1],
        path,
        size,
      };

      return file;
    } catch (error) {
      throw new Error('fatal error in write CSV');
    }
  }
}
