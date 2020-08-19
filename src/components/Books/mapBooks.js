import Epub from 'epubjs';
import fs from 'fs';
import { join } from 'path';

function getJsonFiles(jsonPath) {
  const jsonFiles = [];
  function findJsonFile(path) {
    const files = fs.readdirSync(path);
    files.forEach((item, index) => {
      const fPath = join(path, item);
      const stat = fs.statSync(fPath);
      if (stat.isDirectory() === true) {
        findJsonFile(fPath);
      }
      if (stat.isFile() === true) {
        jsonFiles.push(fPath);
        const Book = new Epub(fPath);
        console.log(Book);
      }
    });
  }
  findJsonFile(jsonPath);
  console.log(jsonFiles);
}

getJsonFiles('src/assets/books');
