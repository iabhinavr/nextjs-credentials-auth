import { hash, verify } from "@node-rs/argon2";
import { sha1 } from "@oslojs/crypto/sha1";
import { encodeHexLowerCase } from "@oslojs/encoding";

export async function hashPassword(password) {
    return await hash(password, {
        memoryCost: 65536,
        timeCost: 3,
        outputLen: 32,
        parallelism: 1,
    });
}

export async function verifyPasswordHash(hash, password) {
    return await verify(hash, password);
}

export async function verifyPasswordStrength(password) {
 
    if (password.length < 8 || password.length > 72) {
      return "short";
    }

    if(password.length > 72) {
        return "long";
    }
  
    // Check for at least one lowercase, one uppercase, and one special character

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    if (!(hasLowercase && hasUppercase && hasSpecialChar)) {
        return "weak";
    }

    // check in the known breach list

    const hash = encodeHexLowerCase(sha1(new TextEncoder().encode(password)));
    const hashPrefix = hash.slice(0, 5);
    const response = await fetch(`https://api.pwnedpasswords.com/range/${hashPrefix}`);
    const data = await response.text();
    const items = data.split("\n");

    for (let item of items) {
        let hashSuffix = item.slice(0, 35).toLocaleLowerCase();
        if(hash === hashPrefix + hashSuffix) {
            return "pwned";
        }
    }

    return "ok";
    
  }
  