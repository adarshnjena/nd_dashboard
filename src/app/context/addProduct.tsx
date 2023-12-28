"use client";
import { create } from "zustand";

interface ProductFormState {
  productFormVisible: boolean;
  setProductFormVisible: (product: boolean) => void;
}

export const useProductFormState = create<ProductFormState>((set) => ({
  productFormVisible: false,
  setProductFormVisible: (product) => set(() => ({ productFormVisible: product })),
}));
