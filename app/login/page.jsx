import { LoginForm } from "./components";
import Link from "next/link";

export default function Page() {

    return (
        <>
        <div className="login-wrapper">
            <LoginForm />
            <div className="login-links">
                <Link href="/signup">Create an account</Link>
                <Link href="/forgot-password">Forgot Password</Link>
            </div>
            
        </div> 
        </>
    )
}