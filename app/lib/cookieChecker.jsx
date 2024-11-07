"use client";

import { cookieCheckerAction } from "./cookieCheckerAction";
import { useActionState } from "react";

const initialState = null;

export function CookieChecker() {

    const [state, action] = useActionState(cookieCheckerAction, initialState);
    return (
        <>
        <form action={action}>
            <input type="hidden" name="cookieChecker" value="" />
        </form>
        </>
    )
}