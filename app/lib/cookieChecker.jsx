"use client";

import { useEffect } from "react";

/** 
 * this component requests to extend the session cookie if it is about to expire,
 * this requires another api request, because as of now,
 * Next.js allows setting cookie values only in Server Actions and API routes
 * it won't work in SSR pages
 */

export function CookieChecker({ csrfToken }) {

    useEffect(() => {
        const extendSession = async function() {
            const formData = new FormData();

            formData.append("csrf-token", csrfToken);

            const response = await fetch('/api/extend-session', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
        }

        extendSession(); // no need to await this

    }, []);

    return null;
}