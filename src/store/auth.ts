import { JwtPayload, SignInArgs } from '@/api-graphql';
import { apiCaller } from '@/service';
import Cookies from 'js-cookie';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  accessToken?: string;
  refreshToken?: string;
}

interface UserAction {
  signIn: (args: SignInArgs) => Promise<boolean>;
  logout: () => void;
  setToken: (args: Partial<JwtPayload>) => void;
}

export const useAuthStore = create<UserStore & UserAction>()(
  persist(
    (set, get) => ({
      setToken: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),
      signIn: async args => {
        const { accessToken, refreshToken } = await apiCaller
          .signIn(['accessToken', 'refreshToken'])
          .$args(args)
          .$fetch();

        get().setToken({ accessToken, refreshToken });
        return true;
      },
      logout: () => {
        get().setToken({ accessToken: undefined, refreshToken: undefined });
        location.reload();
      },
    }),
    {
      name: 'finder-auth',
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
