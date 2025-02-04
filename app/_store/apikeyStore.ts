import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ApikeyStore {
  apikey: string;
  setApikey: (apikey: string) => void;
}

export const useApikeyStore = create<ApikeyStore>()(
  persist(
    (set) => ({
      apikey: "",
      setApikey: (apikey) => set({ apikey }),
    }),
    { name: "apikey-store" }
  )
);
