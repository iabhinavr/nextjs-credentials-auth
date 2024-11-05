"use server";

import { getUserByEmail } from "@/app/lib/user.db";
import { verifyPasswordHash } from "@/app/lib/password";
import { generateSessionToken, createSession, setSessionTokenCookie } from "@/app/lib/session";
import { redirect } from "next/navigation";

export async function loginAction(prevState, formData) {

    const email = formData.get('email');
    const password = formData.get('password');

    if(email === '' || password === '') {
        return {
            message: "Email and password cannot be empty"
        }
    }

    const user = await getUserByEmail(email);

    if(!user) {
        return {
            message: "Incorrect username or password"
        }
    }

    console.log(user);
    const hashVerification = await verifyPasswordHash(user.password_hash, password);

    if(!hashVerification) {
        return {
            message: "Incorrect username or password"
        }
    }

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    const token = generateSessionToken();
    await createSession(token, user._id, expiresAt);
    await setSessionTokenCookie(token, expiresAt);

    redirect("/settings");
    
    return {
        message: "logged in"
    }
}