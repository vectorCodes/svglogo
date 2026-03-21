import { create } from "zustand";

interface InfiniteState {
  enabled: boolean;
  panX: number;
  panY: number;
  zoom: number;
  toggle: () => void;
  setPan: (x: number, y: number) => void;
  setZoom: (z: number) => void;
  reset: () => void;
}

export const useInfiniteStore = create<InfiniteState>((set) => ({
  enabled: false,
  panX: 0,
  panY: 0,
  zoom: 1,
  toggle: () => set((s) => ({ enabled: !s.enabled, panX: 0, panY: 0, zoom: 1 })),
  setPan: (panX, panY) => set({ panX, panY }),
  setZoom: (zoom) => set({ zoom: Math.max(0.3, Math.min(2, zoom)) }),
  reset: () => set({ panX: 0, panY: 0, zoom: 1 }),
}));
