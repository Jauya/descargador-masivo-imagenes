import { create } from "zustand";

interface FreepikStore {
  term: string;
  setTerm: (term: string) => void;
}
export const useFreepikStore = create<FreepikStore>()((set) => ({
  term: "",
  setTerm: (term) => set({ term }),
  folders: [],
}));
