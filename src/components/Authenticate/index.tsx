"use client"

import {FC, useEffect} from "react";
import Cookies from 'js-cookie';

import {useAuth} from "@/store/auth";
import {StorageKey} from "@/constants/storage";

const Authenticate: FC = () => {
    const {authenticate} = useAuth()

    useEffect(() => {
        const token = Cookies.get(StorageKey.ACCESS_TOKEN);

        if (!token) return;

        authenticate()
    }, []);

    return null
}

export default Authenticate
