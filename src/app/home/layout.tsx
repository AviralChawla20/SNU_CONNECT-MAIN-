import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser();
    console.log(user)
    if (!user) {
        'use server';
        console.log("No User")
        redirect("/login")
    }
    return (
        <>
            {children}
        </>
    )
}