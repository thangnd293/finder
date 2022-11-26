import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PATH } from './common/constants/route';
import PrivateRoute from './components/router-layout/PrivateRoute';
import DefaultLayout from './layouts/DefaultLayout/index';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import appRoute from './routes/appRoute/index';
import authRoute from './routes/authRoute/index';
import IRoute from './typings/route';

import AuthRoute from '@/components/router-layout/AuthRoute';

import { useUpdatePosition } from '@/hooks/usePosition';

function App() {
  useUpdatePosition();
  return (
    <>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Route>
        {renderRoutes([authRoute], AuthRoute)}
        {renderRoutes([appRoute], PrivateRoute)}
        <Route path={PATH.APP.ONBOARDING.SELF} element={<Onboarding />} />
        <Route path='/*' element={<div>404</div>} />
      </Routes>

      <ToastContainer autoClose={2000} limit={5} />
    </>
  );
}

export default App;

function renderRoutes(
  routes: IRoute[],
  Protect: React.ComponentType<any> = Fragment,
) {
  return routes.map((route, index) => {
    const { Component, Layout, children, path, isIndex } = route;
    const Element = Layout ? Layout : Component;

    if (children) {
      return (
        <Route
          key={index}
          path={path}
          element={
            <Protect>
              <Element />
            </Protect>
          }
        >
          {renderRoutes(children, Protect)}
        </Route>
      );
    }

    return (
      <Route
        index={isIndex}
        key={index}
        path={path}
        element={
          <Protect>
            <Element />
          </Protect>
        }
      />
    );
  });
}
