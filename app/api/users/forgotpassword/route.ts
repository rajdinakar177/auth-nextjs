import { connect } from "@/app/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/userModel";
import { sendEmail } from "@/app/helpers/mailer";


export async function POST(request: NextRequest) {
    try {
        await connect();

        const reqBody = await request.json();

        const { email } = reqBody;

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        const normalizedEmail = email.toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            return NextResponse.json(
                { error: "user not found" },
                { status: 400 }
            );
        }
        await sendEmail({
            email: normalizedEmail,
            emailType: "RESET",
            userId: user._id,
        });
        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
        );


    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
