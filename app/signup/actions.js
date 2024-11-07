"use server";

import { createUser, getUserByEmail, getUserByUsername } from "@/app/lib/user.db";
import { hash } from "@node-rs/argon2";
import { hashPassword } from "@/app/lib/password";
import { generateSessionToken, generateCsrfToken, createSession, setSessionTokenCookie } from "@/app/lib/session";
import { redirect } from "next/navigation";

import { validateSignupData } from "@/app/lib/validations";
import { checkBreachedPassword } from "@/app/lib/validations";

export async function signupAction(prevState, formData) {

    let result = {
        status: false,
        errors: []
    }

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    // validate the form using zod

    const validation = await validateSignupData({username, email, password});

    if(validation?.success === false) {

        result.errors = validation.errors;
        
        return result;
    }

    // check if the user already exists

    let user = await getUserByEmail(email);
    
    
    if(user !== null) {
        result.errors = [{message: "the email already exists"}];
        return result;
    }

    user = await getUserByUsername(username);

    if(user !== null) {
        result.errors = [{message: "username already taken"}];
        return result;
    }

    const isPasswordBreached = await checkBreachedPassword(password);

    if(isPasswordBreached === "pwned") {
        result.errors = [{message: "This password is known to be vulnerable"}];
        return result;
    }

    const userData = {
        username: username,
        email: email,
        password_hash: await hashPassword(password),
        email_verified: false,
    }

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    const newUser = await createUser(userData);
    
    const token = generateSessionToken();
    const csrfToken = generateCsrfToken();
    
    await createSession(token, newUser._id, expiresAt, csrfToken);

    await setSessionTokenCookie(token, expiresAt);

    redirect("/settings");

    result.status = true;
    return result;
}