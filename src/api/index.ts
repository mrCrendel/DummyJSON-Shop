import {clientAPI} from "@/api/clientApi";


export type AuthResponse = { id: string, accessToken: string; refreshToken: string, firstName: string; lastName: string; email: string };
export type Product = { id: number; title: string; price: number; category: string; thumbnail: string };

export const authAPI = {
    login: (username: string, password: string) => clientAPI.post<AuthResponse>('/auth/login', { username, password, expiresInMins: 1 }),
    refresh: (refreshToken: string) => clientAPI.post('/auth/refresh', { refreshToken, expiresInMins: 1 }),
    me: () => clientAPI.get('/auth/me'),
};

export const productsAPI = {
    list: (limit = 12) =>
        clientAPI.get<{ products: Product[] }>(`/products?limit=${limit}`).then(res => res.data),
};
