"use client"

import {FC, useEffect} from "react";
import {useRouter} from "next/navigation";

import {Pages} from "@/constants/pages";

import styles from './styles.module.scss';

interface ErrorPageProps {
    error: Error;
    reset?: () => void;
}

const ErrorPage: FC<ErrorPageProps> = ({error, reset}) => {
    const router = useRouter();

    useEffect(() => {
        console.error('ErrorPage caught:', error);
    }, [error]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Упс! Что-то пошло не так.</h1>
            <p className={styles.message}>
                Во время загрузки страницы возникла ошибка.
            </p>
            <div className={styles.actions}>
                {reset && <button onClick={() => reset()} className={styles.button}>
                  Попробовать снова
                </button>}
                <button onClick={() => router.push(Pages.HOME)} className={styles.link}>
                    На главную
                </button>
            </div>
        </div>
    )
}

export default ErrorPage
