import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "../../../../utils/supabase/client";
import { supabase } from '../../../../utils/supabase/client'
import bcryptjs from "bcryptjs";
import * as nodemailer from 'nodemailer';
// import { supabase } from '@/supabase';


export async function POST(req: NextRequest) {
    try {
       

        const reqBody = await req.json();
        const { name, email, password, role } = reqBody
        console.log(reqBody)
        console.log(email, password, role, name)
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        // const supabase = createClient()
        const smtpTransport = nodemailer.createTransport({
            host: 'smtp-relay.sendinblue.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'prathampg2003@gmail.com',
                pass: 'aQbv7CZdDrckyxw8'
            }
        });
        
        // Email content
        const mailOptions = {
            from: 'Snuconnect@gmail.com',
            to: email,
            subject: 'Welcome to SNU Connect!',
            text: `Welcome to SNU Connect! We are thrilled to have you join our community. As a member, you now have access to a vibrant platform designed to connect, engage, and empower students like you at Shiv Nadar University.

            SNU Connect offers a range of features to enhance your university experience, from networking with fellow students and alumni to exploring campus events and resources. Whether you're looking for study groups, career advice, or simply want to stay updated on campus happenings, SNU Connect is here to serve you.
            
            To get started, please complete your profile and explore the various groups and discussions available. Don't hesitate to reach out if you have any questions or need assistance navigating the platform.
            
            We're excited to see you thrive on SNU Connect and look forward to connecting with you online!
            
            Best regards,
            SNUConnect`
        };
        
        // Send email
        smtpTransport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent successfully:', info.response);
            }
        });
        const { data, error } = await supabase
        .from('users')
        .insert([
            { name: name, email: email, password: hashedPassword, role: role},
        ])
        .select()
        if (data) {
            console.log("ho")
            return NextResponse.json({ data: data }, {status: 200})
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

