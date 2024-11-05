"use client";

import { LogoutAction } from "./actions";
import { useActionState } from "react";

const initialState = {
    message: ""
}

export function LogoutForm() {

    const [state, action] = useActionState(LogoutAction, initialState);

    return (
        <>
        <form action={action}>
            <button>Sign Out</button>
        </form>
        <p>{state.message}</p>
        </> 
    )
}