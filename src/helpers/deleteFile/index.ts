import fs from 'fs';

export const deleteFile = async (path: string): Promise<boolean> => {
  try {
    await fs.promises.stat(path);
  } catch (error) {
    return false;
  }

  await fs.promises.unlink(path);

  return true;
};
