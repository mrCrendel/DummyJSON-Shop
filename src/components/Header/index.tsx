import React, {Suspense} from 'react';
import Link from 'next/link';

import HeaderNav from "@/components/Header/components/HeaderNav";
import {Pages} from "@/constants/pages";

import styles from './styles.module.scss';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href={Pages.HOME}>
                    DummyShop
                </Link>
            </div>
            <Suspense>
                <HeaderNav/>
            </Suspense>
        </header>
    )
}
