import { create } from "zustand";

interface FreepikStore {
  lastQueryParams: string;
  setLastQueryParams: (lastQueryParams: string) => void;
  lastPage: number;
  setLastPage: (page: number) => void;
}
export const useFreepikStore = create<FreepikStore>()((set) => ({
  lastQueryParams: "/",
  setLastQueryParams: (lastQueryParams) =>
    set({ lastQueryParams: lastQueryParams }),
  lastPage: 100,
  setLastPage: (lastPage) => set({ lastPage }),
}));
