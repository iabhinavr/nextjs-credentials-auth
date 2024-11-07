"use server";

import { cookies } from "next/headers";
import { getSession } from "./session";
import { setSessionTokenCookie } from "./session";

export async function cookieCheckerAction() { console.log("cookie checker submitted");
    const token = (await cookies()).get("next_app_session")?.value ?? null;

    console.log("token");

    if(token) {
        const session = await getSession();
        await setSessionTokenCookie(token, session.expiresAt);
    }

    return true;
}