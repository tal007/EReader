/**
 * * 首页 图书列表页面
 */

import { PageHeader } from 'antd';
import { useEffect } from 'react';
import fs from 'fs';

const Home = () => {
  useEffect(() => {
    console.log(fs);
  });
  return (
    <div>
      <PageHeader title="图书列表" />
    </div>
  );
};

export default Home;
