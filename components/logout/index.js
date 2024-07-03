"use client";

import { logoutAction } from "@/actions";
import { Button } from "../ui/button";

export default function Logout(){

    async function handleLogout(){
        await logoutAction();
    }
    return (
        <Button onClick={handleLogout} variant="" className="p-2 bg-slate-600 text-white rounded m-3 hover:bg-slate-800 hover:text-white">Logout</Button>
    );
}