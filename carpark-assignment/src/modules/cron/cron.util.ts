import * as fs from 'fs';
import { join } from 'path';

export function getFileName(folderPath: string) {
  const data = fs.readdirSync(folderPath);
  return data;
}

export function getSourceFile() {
  const folderPath = join(__dirname, '../../../', 'source');
  const allFiles = getFileName(folderPath);
  const sortedFiles = allFiles.sort((a: string, b: string) => {
    return a < b ? 1 : -1;
  });
  const executeFile = sortedFiles[0] || '';

  return executeFile;
}
