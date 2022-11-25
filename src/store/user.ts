import { SignInArgs, User } from '@/api-graphql';
import { getUserCurrentFragment } from '@/service/user';
import Cookies from 'js-cookie';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { apiCaller } from '../service/index';

interface UserStore {
  accessToken?: string;
  refreshToken?: string;

  user?: User;
}

interface UserAction {
  signIn: (args: SignInArgs) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore & UserAction>()(
  persist(
    (set, get) => ({
      signIn: async args => {
        console.log('run');

        const { accessToken, refreshToken } = await apiCaller
          .signIn(['accessToken', 'refreshToken'])
          .$args(args)
          .$fetch();

        set({ accessToken, refreshToken });

        const user = await apiCaller
          .getCurrentUser(getUserCurrentFragment)
          .$fetch();

        set({ user });
        return true;
      },
      logout: () => {
        set({ accessToken: undefined, refreshToken: undefined });
        location.reload();
      },
      setUser: user => set({ user }),
    }),
    {
      name: 'user',
      getStorage: () => ({
        getItem: name => Cookies.get(name) as any,
        removeItem: name => Cookies.remove(name) as any,
        setItem: (name, value) => Cookies.set(name, value) as any,
      }),
      partialize: s => ({
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
        user: s.user,
      }),
    },
  ),
);
