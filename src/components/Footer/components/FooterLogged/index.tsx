"use client"

import {FC} from "react";
import {useAuth} from "@/store/auth";

const FooterLogged: FC = () => {
    const { user } = useAuth();

    if (!user) return null

    return <span>Logged as {user.email}</span>
}

export default FooterLogged
