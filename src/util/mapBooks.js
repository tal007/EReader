/* eslint-disable */

import fs from 'fs';
import { join } from 'path';

const jsonFiles = [];
function getJsonFiles(jsonPath) {
  function findJsonFile(path) {
    const files = fs.readdirSync(path);
    files.forEach((item) => {
      const fPath = join(path, item);
      const stat = fs.statSync(fPath);
      if (stat.isDirectory() === true) {
        findJsonFile(fPath);
      }
      if (stat.isFile() === true) {
        jsonFiles.push(fPath);
      }
    });
  }
  findJsonFile(jsonPath);
}

getJsonFiles('src/books');

export { jsonFiles };
