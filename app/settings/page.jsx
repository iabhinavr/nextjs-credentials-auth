import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { LogoutForm } from "./components";
import { CookieChecker } from "@/app/lib/cookieChecker";

export default async function Page() {

    const session = await getSession();

    if(!session) {
        redirect("/login");
    }

    return (
        <>
        <div className="admin-page">
            <h1>Welcome, {session.user.username}</h1>
            <h2>Change Password</h2>
            <LogoutForm csrfToken={session?.csrfToken} />
        </div>
        <CookieChecker csrfToken={session?.csrfToken} />
        </>
    )
}