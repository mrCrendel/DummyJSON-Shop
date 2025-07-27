import {FC, Suspense} from "react";

import FooterLogged from "@/components/Footer/components/FooterLogged";

import styles from './styles.module.scss';

const year = new Date().getFullYear();

const Footer: FC = () => {
    return <footer className={styles.footer}>
        <span>© {year}</span>
        {"  "}
        <Suspense>
            <FooterLogged/>
        </Suspense>
    </footer>
}

export default Footer
