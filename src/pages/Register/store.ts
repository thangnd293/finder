import create from 'zustand';

import { IStore } from '@/store';

interface RegisterStore {
  email: string | null;
}

export const useRegisterStore = create<IStore<RegisterStore>>((set, get) => ({
  email: null,
  setEmail: email => set({ email }),
}));
