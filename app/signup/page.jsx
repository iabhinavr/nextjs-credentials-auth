import { SignUpForm } from "./components";
import Link from "next/link";

export default function Page() {

    return (
        <>
        <div className="signup-wrapper">
        {/* now we need to create the signup form components */}

        <SignUpForm />
        <div className="login-links">
            <Link href="/login">Already have an account?<br />Login</Link>
        </div>
        </div>
        
        </>
    )
}