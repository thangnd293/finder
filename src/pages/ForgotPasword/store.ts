import create from 'zustand';

import { IStore } from '@/store';

interface ForgotStore {
  email: string | null;
}

interface ForgotAction {
  clear: () => void;
}

export const useForgotStore = create<IStore<ForgotStore> & ForgotAction>(
  (set, get) => ({
    email: null,
    setEmail: email => set({ email }),
    clear: () => set({ email: null }),
  }),
);
