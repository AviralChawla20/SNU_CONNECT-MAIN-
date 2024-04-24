// import { Neonderthaw } from "next/font/google";
import { NextResponse } from "next/server";
import { supabase } from '../../../../utils/supabase/client'



const POST = async (req: any) => {
    try {
        const reqBody = await req.json();
        const { email, company, role, stipend, location, description} = reqBody
        console.log(reqBody)
        console.log(email)
        var name2 = ""

        let { data: name, error: error2 } = await supabase
        .from('users')
        .select(`
            name
        `)
            .eq("email", email)
        
        if (name) {
            console.log(name[0].name)
            name2=name[0].name
        }
        


        const { data, error } = await supabase
        .from('internships')
        .insert([
            { role: role, email: email, company: company, location: location, stipend: stipend, name: name2, description: description},
        ])
            .select()
        if (data) {
            console.log("Hello")
            return NextResponse.json({ data: data }, {status: 200})
        }
        else {
            console.log("here")
            return NextResponse.json({ error: error.message })
        }
        // return NextResponse.json({ message: "Login Successful" }, { status: 200 })
    }
    catch (error) {
        console.log("hahapls")
        return { error: "Invalid request body" }
    }
}

const GET = async (req: any) => {
    try {
        console.log(req.url)
        const uml = new URL(req.url)
        const search = new URLSearchParams(uml.search);
        const email = search.get('email')
        console.log(email)

        
        let { data: tweets, error } = await supabase
        .from('internships')
        .select(`
            role,
            company,
            name,
            stipend,
            location,
            description
        `)

        if (tweets) {
            console.log(tweets)
            // console.log(users[0].email)
            return NextResponse.json(tweets, { status: 200 })
            // return NextResponse.json({ email: users[0].email, name: users[0].name, phone: users[0].phone, github: users[0].github, linkedin: users[0].linkedin}, { status: 200 })
        }
        if (error) {
            console.log("here")
            return NextResponse.json({ error: error.message })
        }
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};



export {POST, GET}