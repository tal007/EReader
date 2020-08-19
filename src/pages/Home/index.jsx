/**
 * * 首页 图书列表页面
 */

import { PageHeader } from 'antd';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Epubjs from 'epubjs';
import fs from 'fs';
import path from 'path';

const { join } = path;

const jsonFiles = [];
function getJsonFiles(jsonPath) {
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
      }
    });
  }
  findJsonFile(jsonPath);
}
getJsonFiles('src/assets/books');

const Home = (props) => {
  useEffect(() => {
    const Book = new Epubjs(jsonFiles[2]);
    const rendition = Book.renderTo('read', {
      width: 400,
      height: 400,
      // 兼容iOS
      method: 'default',
    });
    console.log(rendition.themes);
    rendition.display();
  });

  const renderBook = (file) => {
    console.log(file);
    // props.history.push('/render', {
    //   file,
    // });
  };
  return (
    <div>
      <PageHeader title="全部图书" />
      <div>
        {jsonFiles.map((file) => (
          <div key={file} onClick={() => renderBook(file)}>
            {file}
          </div>
        ))}
      </div>
      <div id="read" style={{ width: 500, height: 800 }} />
    </div>
  );
};

export default withRouter(Home);
