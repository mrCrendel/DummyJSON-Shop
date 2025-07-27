import { create } from 'zustand';
import { productsAPI, Product } from '@/api';

interface ProductsState {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    load: () => Promise<void>;
}

export const useProducts = create<ProductsState>((set) => ({
    products: [],
    isLoading: false,
    error: null,
    load: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await productsAPI.list();
            const list = response.products;
            set({ products: list, isLoading: false });
        } catch {
            set({ error: 'Не удалось загрузить товары', isLoading: false });
        }
    },
}));
