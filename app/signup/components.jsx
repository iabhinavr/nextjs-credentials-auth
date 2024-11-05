"use client";

import { signupAction } from "./actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const initialState = {
    status: null,
    errors: []
}

export function SignUpForm() {

    const [state, action] = useActionState(signupAction, initialState);

    const { pending } = useFormStatus();

    return (
        <>
        {
            (state.status === false) &&
            <>
            <ul className="form-error-box">
                { state.errors.map((error, index) => (
                    <li key={index}>{error.message}</li>
                ))}
            </ul>
            </>
            
        }
        <form action={action} id="signup-form">
            <h1>Create an account</h1>
            <label htmlFor="signup-form-username">Username</label>
            <input type="text" name="username" id="signup-form-username" required minLength={4} maxLength={31} />

            <label htmlFor="signup-form-email">Email</label>
            <input type="email" name="email" id="signup-form-email" required autoComplete="username" />

            <label htmlFor="signup-form-password">Password</label>
            <input type="password" name="password" id="signup-form-password" required autoComplete="new-password" />

            <button>Continue</button>

        </form>
        </>
        
    )
}