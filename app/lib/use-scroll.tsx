import { create } from "zustand";

interface State {
  state: "before-3d" | "3d" | "after-3d";
  scrolling: "up" | "down";
  scrollingThreshold: number;
}

interface Actions {
  setState: (state: State["state"]) => void;
  setScrolling: (scrolling: State["scrolling"]) => void;
  setScrollingThreshold: (scrollingThreshold: number) => void;
}

export const useScroll = create<State & Actions>((set) => ({
  state: "before-3d",
  scrolling: "down",
  scrollingThreshold: 0,
  setState: (state) => set({ state }),
  setScrolling: (scrolling) => set({ scrolling }),
  setScrollingThreshold: (scrollingThreshold) => set({ scrollingThreshold }),
}));
