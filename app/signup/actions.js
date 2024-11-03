"use server";

import { createUser } from "../../lib/user.db";
import { hash } from "@node-rs/argon2";

export async function signupAction(_prev, formData) {

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    const userData = {
        username: username,
        email: email,
        password_hash: await hash(password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        }),
    }

    const newUser = await createUser(userData);
    console.log(newUser);

    return {
        message: "Signed up",
    }
}