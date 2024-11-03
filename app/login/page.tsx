import { LoginForm } from "./components";
import Link from "next/link";

export default function Page() {

    return (
        <>
            <h1>Sign In</h1>
            <LoginForm />
            <Link href="/signup">Create an account</Link>
            <Link href="/forgot-password">Forgot Password</Link>
        </>
    )
}