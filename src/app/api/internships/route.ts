import { NextResponse } from "next/server";
import { supabase } from '../../../../utils/supabase/client'

const POST = async (req: any): Promise<void | Response> => {
    try {
        const reqBody = await req.json();
        const { email, company, role, stipend, location, description } = reqBody;
        
        let { data, error } = await supabase
            .from('users')
            .select('name')
            .eq("email", email);
        
        let name2 = "";
        if (data && data.length > 0) {
            name2 = data[0].name;
        }

        const { data: insertedData, error: insertError } = await supabase
            .from('internships')
            .insert([
                { role, email, company, location, stipend, name: name2, description },
            ]);

        if (insertedData) {
            return NextResponse.json({ data: insertedData }, { status: 200 });
        } else {
            return NextResponse.json({ error: insertError?.message || "Insert failed" }, { status: 500 });
        }
    } catch (error: any) {
        console.error("Error:", error.message);
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
};

const GET = async (req: any): Promise<void | Response> => {
    try {
        const uml = new URL(req.url);
        const search = new URLSearchParams(uml.search);
        const email = search.get('email');

        const { data: internships, error } = await supabase
            .from('internships')
            .select('role, company, name, stipend, location, description');

        if (internships) {
            return NextResponse.json(internships, { status: 200 });
        } else {
            return NextResponse.json({ error: error?.message || "Failed to fetch internships" }, { status: 500 });
        }
    } catch (error: any) {
        console.error("Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

export { POST, GET };
