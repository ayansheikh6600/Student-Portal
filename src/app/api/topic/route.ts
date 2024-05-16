import { connectToDatabase, getDb } from "@/libs/mongo";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: NextApiResponse) => {
  const body = await req.json();
  console.log(body);

  if (req.method === "POST") {
    await connectToDatabase();

    try {
      const db = getDb();

      const newUser = await db.collection("topics").insertOne(body);

      // Send success response
      return NextResponse.json(
        { message: "Assignment Assign Succesfully", newUser },
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

export const GET = async (req: Request, res: NextApiResponse) => {
  if (req.method === "GET") {
    await connectToDatabase();

    try {
      const db = getDb();

      const assignments = await db.collection("topics").find({}).toArray();

      // Send success response
      return NextResponse.json(
        { message: "All set", data: assignments },
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
