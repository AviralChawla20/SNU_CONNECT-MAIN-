import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "../../../../utils/supabase/client";
import { supabase } from '../../../../utils/supabase/client'
import bcryptjs from "bcryptjs";
// import { supabase } from '@/supabase';

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody
        console.log(reqBody)
        console.log(email, password)
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        console.log(hashedPassword)
        // const supabase = createClient()
        
        let { data: users, error } = await supabase
        .from('users')
            .select('password')
            .eq("email", email)
        // console.log("Users:",users)

        

        if (users) {
            console.log("Inside", users[0].password, hashedPassword)
            const validPassword = await bcryptjs.compare(password,users[0].password)
            console.log(validPassword)
            if (validPassword) {
                console.log("ho")
                return NextResponse.json({ message: "Login Successful" }, {status: 200}) 
            }
            
        }
        // return NextResponse.json({ data: users }) >
        // console.log(users.email)
        if (error) {
            console.log("here")
            return NextResponse.json({ error: error.message })
            
        }
    }
    catch (error) {
        console.log("haha")
        return NextResponse.json({ error: "Invalid request body" })
        }

}