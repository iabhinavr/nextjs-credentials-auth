import { SignUpForm } from "./components"

export default function Page() {

    return (
        <>
        <div className="signup-wrapper">
        <h1>Signup</h1>

        {/* now we need to create the signup form components */}

        <SignUpForm />
        </div>
        
        </>
    )
}