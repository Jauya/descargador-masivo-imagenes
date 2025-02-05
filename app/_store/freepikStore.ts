import { create } from "zustand";

interface FreepikStore {
  lastSearch: string;
  setLastSearch: (lastSearch: string) => void;
  term: string;
  setTerm: (term: string) => void;
  page: number;
  setPage: (page: number) => void;
  lastPage: number;
  setLastPage: (page: number) => void;
}
export const useFreepikStore = create<FreepikStore>()((set) => ({
  lastSearch: "/",
  setLastSearch: (lastSearch) => set({ lastSearch }),
  term: "",
  setTerm: (term) => set({ term }),
  page: 1,
  setPage: (page) => set({ page }),
  lastPage: 100,
  setLastPage: (lastPage) => set({ lastPage }),
}));
