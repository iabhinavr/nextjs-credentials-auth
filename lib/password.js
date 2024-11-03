import { hash, verify } from "@node-rs/argon2";

export async function hashPassword(password) {
    return await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });
}