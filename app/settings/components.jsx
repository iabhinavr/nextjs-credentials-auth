"use client";

import { LogoutAction } from "./actions";
import { useActionState } from "react";

const initialState = {
    status: null,
    message: null,
    errors: []
}

export function LogoutForm() {

    const [state, action] = useActionState(LogoutAction, initialState);

    return (
        <>
        {
            state.status === false &&
            <ul className="bg-red-400">
                { state.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
        }
        <form action={action}>
            <button>Sign Out</button>
        </form>
        <p>{state.message}</p>
        </> 
    )
}