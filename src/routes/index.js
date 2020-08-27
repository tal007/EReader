import { Suspense } from 'react';
import { Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Loading from '@comp/Loading';
import Layout from '@comp/Layout';
import createHistory from 'history/createHashHistory';
import Routes from './Routes';

const history = createHistory();

const App = () => (
  <Router history={history}>
    <Layout>
      <Routes />
    </Layout>
  </Router>
);

const Child = hot(module)(App);

export default function Main() {
  return (
    <Suspense fallback={<Loading />}>
      <Child />
    </Suspense>
  );
}
