import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { cookies } from "next/headers";
import { mongooseConnect, Session } from "./db";

export async function getSession() {

    const token = (await cookies()).get("next_app_session")?.value ?? null;

    if(token === null) {
        return false;
    }

    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

    try {
        mongooseConnect();
        const storedSession = await Session.findOne({sessionId: sessionId}).populate('user').exec();

        if(storedSession === null) {
            return false;
        }


        if(storedSession.user === null) {
            return false;
        }
        
        return storedSession;

    }
    catch(error) {
        console.log(error.message);
        return false;
    }
}

export async function deleteSession(sessionId) {
    try {
        mongooseConnect();
        const deletionResult = await Session.deleteOne({ sessionId: sessionId }).exec();
        return deletionResult;
    }
    catch(error) {
        return false;
    }
}

export async function deleteUserSessions(userId) {
    try {
        mongooseConnect();
        const deletionResult = await Session.deleteMany({ user: userId }).exec();
        return deletionResult;
    }
    catch(error) {
        return false;
    }
}

export async function setSessionTokenCookie(token, expiresAt) {
    
    (await cookies()).set("next_app_session", token, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        expires: expiresAt,
    });
}

export async function deleteSessionTokenCookie() {
    (await cookies()).set("next_app_session", "", {
        httpOnly: true,
        path: '/',
        samesite: 'lax',
        maxAge: 0,
    });
}

export function generateSessionToken() {
    const tokenBytes = new Uint8Array(20);
    crypto.getRandomValues(tokenBytes);
    const token = encodeBase32LowerCaseNoPadding(tokenBytes).toLowerCase();
    return token;
}

export async function createSession(token, userId, expiresAt) {

    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const sessionData = {
        sessionId: sessionId,
        user: userId,
        expiresAt: expiresAt,
    }

    try {
        mongooseConnect();
        const session = await Session.create(sessionData);

        if(!session) {
            return null;
        }
        
        return session;
    }
    catch(error) {
        return false;
    }
}
