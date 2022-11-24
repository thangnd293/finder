import create from 'zustand';

import { IStore } from '@/store';

interface RegisterStore {
  email: string | null;
}

interface RegisterAction {
  clear: () => void;
}

export const useRegisterStore = create<IStore<RegisterStore> & RegisterAction>(
  (set, get) => ({
    email: null,
    setEmail: email => set({ email }),
    clear: () => set({ email: null }),
  }),
);
