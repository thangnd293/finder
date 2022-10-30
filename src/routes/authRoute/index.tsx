import AuthLayout from '@/layouts/AuthLayout';

import IRoute from '@/typings/route';

import Login from '@/pages/Login';
import Register from '@/pages/Register';

import { PATH } from '@/common/constants/route';

const authRoute: IRoute = {
  name: 'Auth',
  path: '/auth',
  Layout: AuthLayout,
  children: [
    {
      name: 'Login',
      path: PATH.AUTH.LOGIN,
      Component: Login,
      isIndex: true,
    },
    {
      name: 'Register',
      path: PATH.AUTH.REGISTER,
      Component: Register,
    },
  ],
};

export default authRoute;
