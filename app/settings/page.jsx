import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {

    const session = await getSession();

    if(!session) {
        redirect("/login");
    }

    return (
        <>
        <h1>Dashboard</h1>
        </>
    )
}