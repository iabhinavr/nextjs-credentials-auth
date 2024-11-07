import { NextResponse } from "next/server";
import { getSession, setSessionTokenCookie } from "@/app/lib/session";
import { cookies } from "next/headers";
import { Session } from "@/app/lib/db";

export async function POST(request) {

    const session = await getSession();

    if(!session?.user) {
        return NextResponse.json({status: "error", message: "Access denied"}, {status: 403});
    }
    
    const formData = await request.formData();

    const csrfToken = formData.get("csrf-token");

    if (csrfToken !== session.csrfToken) {
        return NextResponse.json({status: "error", message: "Invalid token"}, {status: 403});
    }

    const token = (await cookies()).get("next_app_session")?.value ?? null;

    // if the session is about to expire, then extend it for another month from now

    if(Date.now() > session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 10) {

        const newExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await Session.updateOne({sessionId: session.sessionId}, {expiresAt: newExpiresAt}).exec();

        await setSessionTokenCookie(token, newExpiresAt);

        return NextResponse.json({status: "success", message: "session extended"});
    }

    return NextResponse.json({status: "success", message: "session is long enough"});
    
}