"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import { redirect } from "next/navigation";

const initialState = {
    status: null,
    errors: []
}

export function LoginForm({ redirectTo = "/" }) {

    const [state, action] = useActionState(loginAction, initialState);

    if(state.status === true) {
        redirect(redirectTo);
    }

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
        <form action={action} id="login-form">
            <h1>Sign In</h1>
            <label htmlFor="form-login.email">Email</label>
            <input type="email" id="form-login.email" name="email" required />
            <label htmlFor="form-login.password">Password</label>
            <input type="password" name="password" id="form-login.password" required />
            <button>Continue</button>
            <p>{state.message}</p>
        </form>
        </>
        
    )   
}