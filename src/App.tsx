import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { PATH } from './common/constants/route';
import PrivateRoute from './components/PrivateRoute';
import { UploadImageGroup } from './components/UploadImageGroup';
import DefaultLayout from './layouts/DefaultLayout/index';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import { allTopPrivateRoutes, allTopPublicRoutes } from './routes';
import IRoute from './typings/route';

function App() {
  return (
    <>
      <UploadImageGroup
        data={[]}
        length={6}
        onChange={data => {
          console.log(data);
        }}
      />
      <Router>
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
            <Route index element={<Home />} />
          </Route>
          {renderRoutes(allTopPublicRoutes)}
          {renderRoutes(allTopPrivateRoutes)}
          <Route path={PATH.APP.ONBOARDING.SELF} element={<Onboarding />} />
          <Route path='/*' element={<div>404</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

function renderRoutes(routes: IRoute[]) {
  return routes.map((route, index) => {
    const { Component, Layout, children, path, isIndex, isPrivate } = route;
    const Element = Layout ? Layout : Component;
    const Wrapper = isPrivate ? PrivateRoute : Fragment;

    if (children) {
      return (
        <Route
          key={index}
          path={path}
          element={
            <Wrapper>
              <Element />
            </Wrapper>
          }
        >
          {renderRoutes(children)}
        </Route>
      );
    }

    return (
      <Route
        index={isIndex}
        key={index}
        path={path}
        element={
          <Wrapper>
            <Element />
          </Wrapper>
        }
      />
    );
  });
}
