"use server";

import { createUser, getUserByEmail, getUserByUsername } from "@/app/lib/user.db";
import { hash } from "@node-rs/argon2";
import { hashPassword, verifyPasswordStrength } from "@/app/lib/password";
import { generateSessionToken, createSession, setSessionTokenCookie } from "@/app/lib/session";

export async function signupAction(prevState, formData) {

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    // check if the user already exists

    let user = await getUserByEmail(email);
    
    if(user === false) {
        return {
            message: "error occurred",
        }
    }
    else if(user !== null) {
        return {
            message: "an account already exists with that email",
        }
    }

    user = await getUserByUsername(username);

    if(user === false) {
        return {
            message: "error occurred",
        }
    }
    else if(user !== null) {
        return {
            message: "username already taken",
        }
    }

    let passwordStrength = await verifyPasswordStrength(password);

    if(!passwordStrength) {
        return {
            message: "password is invalid"
        }
    }

    switch(passwordStrength) {
        case "short":
            return { message: "password must be at least 8 characters long" };
        case "long":
            return { message: "password length cannot be more than 72 characters" };
        case "weak":
            return { message: "weak password, must contain uppercase, lowercase, and special character" };
        case "pwned":
            return { message: "weak password, try another combination" };
    }

    if(passwordStrength !== "ok") {
        return { message: "some error occurred" };
    }

    const userData = {
        username: username,
        email: email,
        password_hash: await hashPassword(password),
    }

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    const newUser = await createUser(userData);
    
    const token = generateSessionToken();
    
    await createSession(token, newUser._id, expiresAt);

    await setSessionTokenCookie(token, expiresAt);

    return {
        message: "Signed up",
    }
}