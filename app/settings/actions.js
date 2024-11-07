"use server";

import { getSession, deleteSession, deleteUserSessions, deleteSessionTokenCookie } from "@/app/lib/session";
import { redirect } from "next/navigation";

export async function LogoutAction(prevState, formData) {

    const result = {
        status: false,
        errors: []
    }

    /**
     * validate the session
     */

    const session = await getSession();

    /**
     * verify csrf token
     */

    const csrfToken = formData.get("csrf-token");

    if(csrfToken !== session?.csrfToken) {
        result.errors.push({message: "Invalid token"});
        return result;
    }

    if(!session) {
        result.errors.push({message: "Invalid request"});
        return result;
    }

    if(session?.user === null) {
        result.errors.push({message: "Invalid request"});
        return result;
    }

    await deleteUserSessions(session.user._id);
    await deleteSessionTokenCookie();

    redirect("/login");

}