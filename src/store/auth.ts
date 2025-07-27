import axios from "axios";
import Cookies from 'js-cookie';
import {create} from 'zustand';

import {authAPI} from '@/api';
import {StorageKey} from "@/constants/storage";

interface AuthState {
    isAuthenticated: boolean | null;
    user: { firstName: string; lastName: string; email: string } | null;
    error: string | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<{ error?: string | null; token?: string; user?: { firstName: string; lastName: string; email: string  }}>;
    logout: () => void;
    authenticate: () => void;
}

export const useAuth = create<AuthState>((set, get) => ({
    isAuthenticated: false,
    user: null,
    error: null,
    isLoading: false,
    login: async (username: string, password: string) => {
        set({isLoading: true, error: null});
        try {
            const response = await authAPI.login(username, password);
            const {accessToken, refreshToken, ...user} = response.data;

            Cookies.set(StorageKey.ACCESS_TOKEN, accessToken);
            Cookies.set(StorageKey.REFRESH_TOKEN, refreshToken);
            set({isAuthenticated: !!accessToken, user, isLoading: false});
            return { user }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || 'Something went wrong';
                set({error: message, isLoading: false});
                return { error: message }
            }
            throw error;
        }
    },
    logout: () => {
        Cookies.remove(StorageKey.ACCESS_TOKEN);
        Cookies.remove(StorageKey.REFRESH_TOKEN);
        set({isAuthenticated: null, user: null});
    },
    authenticate: async () => {
        const token = Cookies.get(StorageKey.ACCESS_TOKEN);
        if (token) {
            const response = await authAPI.me();
            const user = response.data;
            set({isAuthenticated: true, user});
        } else {
            set({isAuthenticated: false, user: null});
        }
    },
}));
