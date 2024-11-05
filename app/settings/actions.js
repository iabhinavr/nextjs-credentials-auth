"use server";

import { getSession, deleteSession, deleteUserSessions, deleteSessionTokenCookie } from "@/app/lib/session";
import { redirect } from "next/navigation";

export async function LogoutAction(prevState, formData) {

    /**
     * verify csrf token
     */

    /**
     * validate the session
     */

    const session = await getSession();

    if(!session) {
        return {
            message: "invalid request"
        }
    }

    if(session?.user === null) {
        return {
            message: "invalid request"
        }
    }

    await deleteUserSessions(session.user._id);
    await deleteSessionTokenCookie();

    redirect("/login");

    return {
        message: "signed out"
    }
}