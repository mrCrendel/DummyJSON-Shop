'use client'

import {FC} from "react";
import { z } from 'zod';
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";

import {useAuth} from "@/store/auth";
import {zodResolver} from "@hookform/resolvers/zod";

import styles from './styles.module.scss';
import {Pages} from "@/constants/pages";
import Spinner from "@/components/Spinner";

const loginSchema = z.object({
    username: z.string().min(3, 'Input must be at least 3 characters').trim(),
    password: z.string().min(3, 'Input must be at least 3 characters').trim(),
});

type LoginFormSchema = z.infer<typeof loginSchema>;

const LoginForm: FC = () => {
    const { login, isLoading, error } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormSchema>({ resolver: zodResolver(loginSchema) });

    const onSubmit = async (data: LoginFormSchema) => {
        const { error } = await login(data.username, data.password);
        if (!error) {
            router.push(Pages.HOME);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
                <h1 className={styles.title}>Login</h1>

                <div className={styles.field}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" {...register('username')} />
                    {errors.username && <p className={styles.error}>{errors.username.message}</p>}
                </div>

                <div className={styles.field}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" {...register('password')} />
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                </div>

                <button type="submit" className={styles.button} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Login'}
                </button>

                {error && <p className={styles.errorGlobal}>{error}</p>}
            </form>
        </div>
    )
}

export default LoginForm
