import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "../../../../utils/supabase/client";
import {supabase} from '../../../../utils/supabase/client'
// import { supabase } from '@/supabase';

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { name, email, password, role } = reqBody
        console.log(reqBody)
        console.log(email, password, role, name)
        // const supabase = createClient()
        const { data, error } = await supabase
        .from('users')
        .insert([
            { name: name, email: email, password: password, role: role},
        ])
        .select()
        if (data) {
            console.log("ho")
            return NextResponse.json({ data: data })
        }
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