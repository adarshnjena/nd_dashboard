"use client";
import { create } from "zustand";

interface BlurState {
  blur: boolean;
  setblur: (client: boolean) => void;
}

export const useBlur = create<BlurState>((set) => ({
  blur: false,
  setblur: (client) => set(() => ({ blur: client })),
}));
