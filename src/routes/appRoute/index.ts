import DefaultLayout from '@/layouts/DefaultLayout';

import IRoute from '@/typings/route';

import Home from '@/pages/Home';
import Messages from '@/pages/Messages';
import Profile from '@/pages/Profile';
import ProfileEdit from '@/pages/ProfileEdit';
import ProfileEditGender from '@/pages/ProfileEditGender/index';
import ProfileEditInterests from '@/pages/ProfileEditInterests';

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
    name: 'Profile edit interests',
    path: PATH.APP.PROFILE.EDIT_INTERESTS,
    Component: ProfileEditInterests,
  },
  {
    name: 'Profile edit interests',
    path: PATH.APP.PROFILE.EDIT_GENDER,
    Component: ProfileEditGender,
  },
  {
    name: 'Cài đặt',
    path: PATH.APP.SETTING.SELF,
    Component: Profile,
  },
  {
    name: 'Setting test 1',
    path: PATH.APP.SETTING.TEST_1,
    Component: Profile,
  },
  {
    name: 'Hiển thị cho tôi',
    path: PATH.APP.SETTING.GENDER,
    Component: Profile,
  },
  {
    name: 'Nhắn tin',
    path: PATH.APP.MESSAGES.CHAT,
    Component: Messages,
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
