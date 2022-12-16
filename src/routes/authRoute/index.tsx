import AuthLayout from '@/layouts/AuthLayout';

import IRoute from '@/typings/route';

import Forgot from '@/pages/ForgotPasword';
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
    {
      name: 'Forgot Password',
      path: PATH.AUTH.FORGOT,
      Component: Forgot,
    },
  ],
};

export default authRoute;
