import { NextRequest, NextResponse } from 'next/server';
import {Pages} from "@/constants/pages";
import {StorageKey} from "@/constants/storage";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get(StorageKey.ACCESS_TOKEN);

    if (token && pathname === Pages.LOGIN)
        return NextResponse.redirect(Pages.HOME);
}
export const config = { matcher: ['/(?!_next|favicon.ico).*'] };
