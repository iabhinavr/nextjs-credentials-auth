"use server";

import { getSession, deleteSession, deleteUserSessions, deleteSessionTokenCookie } from "@/app/lib/session";

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

    return {
        message: "signed out"
    }
}