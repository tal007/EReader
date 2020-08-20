/* eslint-disable prettier/prettier */
import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('@pages/Home/index'));
const BookRead = lazy(() => import('@pages/BookRead/index'));

export const routes = [
  {
    path: '/',
    component: Home,
    displayName: 'Home',
    exact: true,
  },
  {
    path: '/read',
    component: BookRead,
    displayName: 'BookRead',
    exact: true,
  },
];

const Routes = () => (
  <Switch>
    {routes.map((value) => (
      <Route
        key={value.path}
        path={value.path}
        exact={!!value.exact}
        component={value.component}
      />
    ))}
  </Switch>
);

export default Routes;
