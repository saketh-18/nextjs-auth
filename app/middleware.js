import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(req){
    const path = req.nextUrl.pathname;
    const checkPath = path === "/sign-in" || path === "/sign-up";
    const getCookies = cookies();
    const token = getCookies.get("token")?.value || "";

    if(checkPath && token !== ""){
        return NextResponse.redirect(new URL("/" , req.nextUrl));
    }

    if(!checkPath && token === ""){
        return NextResponse.redirect(new URL("/sign-in" , req.nextUrl));
    }
}

export const config = {
    matcher :["/sign-in" , "/sign-up"],
};