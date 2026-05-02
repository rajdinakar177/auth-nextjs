import { connect } from "@/app/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    // 1. Get data from request body
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // 5. Save user
    const savedUser = await newUser.save();

    // 6. Return response
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
