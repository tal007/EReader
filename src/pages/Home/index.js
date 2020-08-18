/**
 * * 首页 图书列表页面
 */

import { PageHeader } from 'antd';
import { useEffect } from 'react';

// const fs = require('fs');

const Home = () => {
  useEffect(() => {
    console.log(222);
  });
  return (
    <div>
      <PageHeader title="Home" />
    </div>
  );
};

export default Home;
