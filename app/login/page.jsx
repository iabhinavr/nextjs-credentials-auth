import { LoginForm } from "./components";
import Link from "next/link";
import { validateRedirectPath } from "../lib/validations";

export default async function Page({ searchParams }) {

    const filters = (await searchParams);
    
    if(!validateRedirectPath(filters.redirect_to)) {
        filters.redirect_to = "/";
    }

    return (
        <>
        <div className="login-wrapper">
            <LoginForm redirectTo={filters.redirect_to} />
            <div className="login-links">
                <Link href="/signup">Create an account</Link>
                <Link href="/forgot-password">Forgot Password</Link>
            </div>
        </div> 
        </>
    )
}