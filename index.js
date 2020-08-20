import React from 'react';
import { render } from 'react-dom';
import App from './src/routes';
import '@util/mapBooks';
import '@styl/index.less';

const rootEle = document.getElementById('root');
render(<App />, rootEle);
