import DefaultLayout from '@/layouts/DefaultLayout';

import IRoute from '@/typings/route';

import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import ProfileEdit from '@/pages/ProfileEdit';

import { PATH } from '@/common/constants/route';

const appChildRoute: IRoute[] = [
  {
    name: 'Home',
    path: PATH.APP.HOME,
    Component: Home,
    isIndex: true,
  },
  {
    name: 'Profile',
    path: PATH.APP.PROFILE.SELF,
    Component: Profile,
    isIndex: true,
  },
  {
    name: 'Profile edit',
    path: PATH.APP.PROFILE.EDIT,
    Component: ProfileEdit,
  },
  {
    name: 'Setting',
    path: PATH.APP.SETTING.SELF,
    Component: Profile,
  },
  {
    name: 'Setting test 1',
    path: PATH.APP.SETTING.TEST_1,
    Component: Profile,
  },
  {
    name: 'Setting test 2',
    path: PATH.APP.SETTING.TEST_2,
    Component: Profile,
  },
];

const appRoute: IRoute = {
  name: 'App',
  path: PATH.APP.SELF,
  isPrivate: true,
  Layout: DefaultLayout,
  children: appChildRoute,
};

export default appRoute;
