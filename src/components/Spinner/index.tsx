import React from 'react';
import styles from './styles.module.scss';

interface SpinnerProps {
    size?: number;
}

export default function Spinner({ size = 48 }: SpinnerProps) {
    return (
        <div
            className={styles.spinner}
            style={{ width: size, height: size, borderWidth: Math.max(2, size * 0.08) }}
        />
    );
}
