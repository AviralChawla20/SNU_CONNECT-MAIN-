// import { Neonderthaw } from "next/font/google";
import { NextResponse } from "next/server";
import { supabase } from '../../../../utils/supabase/client'



const POST = async (req: any) => {
    try {
        const reqBody = await req.json();
        const { email, name, phone, github, linkedin } = reqBody
        console.log(reqBody)
        console.log(email)
        const { data, error } = await supabase
        .from('users')
        .update({ phone: phone, github: github, linkedin: linkedin, name: name})
        .eq('email', email)
            .select()
        if (data) {
            // console.log("Hello")
            return NextResponse.json({ data: data }, {status: 200})
        }


        return NextResponse.json({ message: "Updated Successfully" }, { status: 200 })
    }
    catch (error) {
        console.log("haha")
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

        let { data: users, error } = await supabase
        .from('users')
            .select("*")
            .eq("email", email)
        if (users) {
            console.log(users[0].email)
            return NextResponse.json({ email: users[0].email, name: users[0].name, phone: users[0].phone, github: users[0].github, linkedin: users[0].linkedin,role:users[0].role}, { status: 200 })
        }
        
        
        if (error) {
            console.log("here")
            return NextResponse.json({ error: error.message })
            
        
        }

//         const url = req.url
//         const queryString = url.split('?')[1]; // Get the query string part after '?'
//         // console.log(queryString)
//     const params = new URLSearchParams(queryString); // Create URLSearchParams object

// // Get the value of the 'email' parameter (decoded)
//     const email = params.get('email'); // This will return '%22aviralchawla02@gmail.com%22'
//         if (email) {
//             const decodedEmail = decodeURIComponent(email);
//             // console.log(decodedEmail);
//         }
        
// Decode the email value (remove URL encoding)
     // Extract 'email' from query parameters
    // const { email } = req.query; // Extract 'email' from query parameters

    if (!email) {
      throw new Error("Email parameter is missing");
    }

    // console.log("Email:", email);

    // Perform any necessary actions based on the 'email' parameter

    return NextResponse.json({ message: "Login Successful", email }, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};



export {POST, GET}