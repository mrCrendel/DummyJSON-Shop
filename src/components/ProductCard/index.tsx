'use client';

import React from 'react';
import Image from 'next/image';

import { Product } from '@/api';
import {useAuth} from "@/store/auth";

import styles from './styles.module.scss';

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const { user } = useAuth();

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    className={styles.image}
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/fallback.png'; }}
                    width={200}
                    height={200}
                />
            </div>

            <div className={styles.info}>
                <h2 className={styles.title}>{product.title}</h2>
                <p className={styles.category}>{product.category}</p>
                <p className={styles.price}>${product.price.toFixed(2)}</p>
                {user && (
                    <button className={styles.button} type="button">
                        Add to cart
                    </button>
                )}
            </div>
        </div>
    )
}
