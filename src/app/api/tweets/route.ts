import { NextResponse } from "next/server";
import { supabase } from '../../../../utils/supabase/client';

const POST = async (req: any): Promise<void | Response> => {
    try {
        const reqBody = await req.json();
        const { email, tweet, title } = reqBody;

        // Fetch user name based on email
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('name')
            .eq("email", email);

        if (userError) {
            throw new Error(userError.message || "Failed to fetch user data");
        }

        const name2 = userData ? userData[0]?.name : '';

        // Insert tweet into 'tweets' table
        const { data, error } = await supabase
            .from('tweets')
            .insert([{ title, email, tweet, name: name2 }]);

        if (error) {
            throw new Error(error.message || "Failed to insert tweet");
        }

        // Return success response with inserted data
        return NextResponse.json({ data }, { status: 200 });
    } catch (error: any) {
        console.error("Error:", error.message);
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
};

const GET = async (req: any): Promise<void | Response> => {
    try {
        const uml = new URL(req.url);
        const search = uml.searchParams;
        const email = search.get('email');

        // Fetch tweets based on the provided email
        const { data: tweets, error } = await supabase
            .from('tweets')
            .select('tweet, title, name')
            .eq("email", email);

        if (error) {
            throw new Error(error.message || "Failed to fetch tweets");
        }

        // Return tweets if found
        return NextResponse.json(tweets || [], { status: 200 });
    } catch (error: any) {
        console.error("Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

export { POST, GET };
