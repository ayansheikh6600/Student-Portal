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

  const {objtosend} = body

  if (req.method === "POST") {
    await connectToDatabase();

    try {
      const { userName, email, password, userType, rollNo , imageURL}: any = objtosend;
      const db = getDb();

      //   const User = await db.collection('exampleCollection').find({}).toArray();

      // Check if the user already exists
      const existingUser = await db.collection("users").findOne({ email });
      console.log(existingUser);

      if (existingUser) {
        return NextResponse.json(
          { message: "User already exists" },
          { status: 400 }
        );
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(password);

      // Create a new user
      const newUser = await db
        .collection("users")
        .insertOne({ userName, email, password: hashedPassword, userType, rollNo, imageURL });

      // Generate JWT token
      const token = jwt.sign({ userId: newUser._id }, "totla");

      // Send success response
      return NextResponse.json(
        { message: "User created successfully", data:{token, user : {userName, email, id :newUser._id , userType, rollNo, imageURL}} },
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
