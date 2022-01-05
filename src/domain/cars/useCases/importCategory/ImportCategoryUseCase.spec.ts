import { resolve } from 'path';

import { MockCsv } from '../../../../shared/mocks/csv.mock';

const path = resolve(__dirname);

describe('Import Category', () => {
  it('test mockCsvClass', async () => {
    const teste = ['testando, 123, 345', 'umCudesse, 123, 456'];

    const mockCsvClass = new MockCsv();

    const file = await mockCsvClass.mockCsv(`${path}/teste.csv`, teste);

    console.log(file);

    await mockCsvClass.deleteCsv(`${path}/teste.csv`);

    console.log('end');
  });
});
