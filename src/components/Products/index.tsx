import React from 'react';

import { Product } from '@/api';
import ProductCard from "@/components/ProductCard";

import styles from './styles.module.scss';

interface Props {
    products: Product[];
}

export default function Products({ products }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.products}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
