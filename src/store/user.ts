import { User } from '@/api-graphql';
import { apiCaller } from '@/service';
import { getUserCurrentFragment } from '@/service/user';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  user?: User;
}

interface UserAction {
  updateUserCurrent: () => Promise<boolean>;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore & UserAction>()(
  persist(
    (set, get) => ({
      updateUserCurrent: async () => {
        const user = await apiCaller
          .getCurrentUser(getUserCurrentFragment)
          .$fetch();

        get().setUser(user);
        return true;
      },
      setUser: user => set({ user }),
    }),
    {
      name: 'finder-user',
      partialize: s => ({
        user: s.user,
      }),
    },
  ),
);
