"use client";

import React, {FC} from "react";
import styles from "@/components/Header/styles.module.scss";
import Link from "next/link";

import {useAuth} from "@/store/auth";

import {Pages} from "@/constants/pages";
import {useRouter} from "next/navigation";

const HeaderNav: FC = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push(Pages.LOGIN);
    };

    return <nav className={styles.nav}>
        {!user ? (
            <Link href="/login" className={styles.link}>
                Login
            </Link>
        ) : (
            <>
            <span className={styles.userName}>
              {user.firstName} {user.lastName}
            </span>
                <button onClick={handleLogout} className={styles.button}>
                    Logout
                </button>
            </>
        )}
    </nav>
}

export default HeaderNav
