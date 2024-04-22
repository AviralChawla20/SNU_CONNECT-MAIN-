// import { login, signup } from './actions'

import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
// import { RedirectType } from "next/navigation";

export default function LoginPage() {
    const login = async () => {
        'use server';
        console.log("Signin");
        const supabase = createClient()
        const { data, error } = await supabase.auth.signInWithPassword({
            email: 'aviralchawla02@gmail.com',
            password: 'Aviral@123',
        })
        if (error) {
            console.error(error)
        }
        else {
            return redirect("/")
        }
    }

    const signup = async () => {
        'use server';
        console.log("Signin");
        const supabase = createClient()
        const { data, error } = await supabase.auth.signUp({
            email: 'aviralchawla02@gmail.com',
            password: 'Aviral@123',
            options: {
                emailRedirectTo: 'https://example.com/welcome',
            },
        })

    }

    const signout = async () => {
        'use server';
        console.log("Signin");
        const supabase = createClient()
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error(error)
        }
        else {
            return redirect("/")
        }
    }
    return (
        <form>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <button formAction={login}>Log in</button>
            <button formAction={signup}>Sign up</button>
            <button formAction={signout}>Sign Out</button>
        </form>
    )
}