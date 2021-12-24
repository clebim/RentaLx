import path from 'path';

export const getFileName = (): string => {
  return path.basename(__filename);
};
