"use client";

import { LogoutAction } from "./actions";
import { useActionState, useEffect } from "react";

const initialState = {
    status: null,
    errors: []
}

export function LogoutForm({ csrfToken }) {

    const [state, action] = useActionState(LogoutAction, initialState);

    return (
        <>
        {
            state.status === false &&
            <ul className="bg-red-400">
                { state.errors.map((error, index) => (
                    <li key={index}>{error.message}</li>
                ))}
            </ul>
        }
        <form action={action}>
            <input type="hidden" name="csrf-token" value={csrfToken} />
            <button>Sign Out</button>
        </form>
        </> 
    )
}