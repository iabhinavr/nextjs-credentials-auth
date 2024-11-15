"use server";

import { getUserByEmail } from "@/app/lib/user";
import { verifyPasswordHash } from "@/app/lib/password";
import { generateSessionToken, generateCsrfToken, createSession, setSessionTokenCookie } from "@/app/lib/session";
import { redirect } from "next/navigation";

export async function loginAction(prevState, formData) {

    let result = {
        status: false,
        errors: []
    }

    const email = formData.get('email');
    const password = formData.get('password');

    const user = await getUserByEmail(email);

    if(!user) {
        result.errors = [{message: "Incorrect username or password"}]
        return result;
    }

    console.log(user);
    const hashVerification = await verifyPasswordHash(user.password_hash, password);

    if(!hashVerification) {
        result.errors = [{message: "Incorrect username or password"}]
        return result;
    }

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    const token = generateSessionToken();
    const csrfToken = generateCsrfToken();

    await createSession(token, user._id, expiresAt, csrfToken);
    await setSessionTokenCookie(token, expiresAt);
    
    result.status = true;
    return result;
}