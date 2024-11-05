import { z } from "zod";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha1 } from "@oslojs/crypto/sha1";

const signupSchema = z.object({
    username: z
      .string()
      .min(1, { message: "Username is required" })
      .regex(/^[a-zA-Z0-9]+$/, { message: "Username must be alphanumeric" }),
    email: z
      .string()
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(72, { message: "Password cannot exceed 72 characters" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
  });

  export async function checkBreachedPassword(password) {

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

  export async function validateSignupData(data) {
    try {

      const validatedData = signupSchema.parse(data);
      return { success: true, data: validatedData };
      
    } catch (error) {
      if (error instanceof z.ZodError) {

        return { success: false, errors: error.errors };

      }
    }
  }

