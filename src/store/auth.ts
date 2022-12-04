import Cookies from 'js-cookie';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { apiCaller } from '../service/index';

import { useUserStore } from '@/store/user';

import { SignInArgs } from '@/api-graphql';

interface UserStore {
  accessToken?: string;
  refreshToken?: string;
}

interface UserAction {
  signIn: (args: SignInArgs) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<UserStore & UserAction>()(
  persist(
    (set, get) => ({
      signIn: async args => {
        const { accessToken, refreshToken } = await apiCaller
          .signIn(['accessToken', 'refreshToken'])
          .$args(args)
          .$fetch();

        set({ accessToken, refreshToken });

        await useUserStore.getState().getUser();
        return true;
      },
      logout: () => {
        set({
          accessToken: undefined,
          refreshToken: undefined,
        });
        useUserStore.getState().setUser(undefined);

        location.reload();
      },
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
      }),
    },
  ),
);
