// pages/api/signup.ts

import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, getDb } from "@/libs/mongo";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// Establish connection to MongoDB database

export const POST = async (req: Request, res: NextApiResponse) => {
  const body = await req.json();
  console.log(body);

  if (req.method === "POST") {
    await connectToDatabase();

    try {
      const { email, password }: any = body;
      const db = getDb();

      //   const User = await db.collection('exampleCollection').find({}).toArray();

      // Check if the user already exists
      const existingUser = await db.collection("users").findOne({ email });
      //   console.log(existingUser);

      if (!existingUser) {
        return NextResponse.json(
          { message: "User not found", existingUser: existingUser },
          { status: 400 }
        );
      }

      // Hash the password
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );
      console.log(password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }

      const token = jwt.sign({ userId: existingUser._id }, "totla");

      // Send success response
      return NextResponse.json(
        { message: "User login successfully"  , userData:{user : existingUser, token}},
        { status: 200 }
      );
    } catch (error) {
      // Handle errors
      console.error(error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  } else {
    // Handle other HTTP methods
    return NextResponse.json(
      { message: `Method ${req.method} Not Allowed` },
      { status: 405 }
    );
  }
};

