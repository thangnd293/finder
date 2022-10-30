import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import DefaultLayout from './layouts/DefaultLayout/index';
import Home from './pages/Home';
import { allTopPrivateRoutes, allTopPublicRoutes } from './routes';
import IRoute from './typings/route';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<Home />} />
        </Route>
        {renderRoutes(allTopPublicRoutes)}
        {renderRoutes(allTopPrivateRoutes)}
        <Route path='/*' element={<div>404</div>} />
      </Routes>
    </Router>
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
