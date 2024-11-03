"use client";

import { signupAction } from "./actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const initialState = {
    message: "",
}

export function SignUpForm() {

    const [state, action] = useActionState(signupAction, initialState);

    const { pending } = useFormStatus();

    return (
        <>
        <form action={action} id="signup-form">
            <label htmlFor="signup-form-username">Username</label>
            <input type="text" name="username" id="signup-form-username" required minLength={4} maxLength={31} />

            <label htmlFor="signup-form-email">Email</label>
            <input type="email" name="email" id="signup-form-email" required autoComplete="username" />

            <label htmlFor="signup-form-password">Password</label>
            <input type="password" name="password" id="signup-form-password" required autoComplete="new-password" />

            <button>Continue</button>

            <p>{state.message}</p>

        </form>
        </>
        
    )
}