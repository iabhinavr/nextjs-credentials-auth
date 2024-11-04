"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

const initialState = {
    message: ""
};

export function LoginForm() {

    const [state, action] = useActionState(loginAction, initialState);
    return (
        <form action={action} id="login-form">
            <h1>Sign In</h1>
            <label htmlFor="form-login.email">Email</label>
            <input type="email" id="form-login.email" name="email" required />
            <label htmlFor="form-login.password">Password</label>
            <input type="password" name="password" id="form-login.password" required />
            <button>Continue</button>
            <p>{state.message}</p>
        </form>
    )   
}