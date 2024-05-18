import { connectToDatabase, getDb } from "@/libs/mongo";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const POST = async (req: Request, res: NextApiResponse) => {
  const body = await req.json();
  console.log(body);

  if (req.method === "POST") {
    await connectToDatabase();

    try {
      const db = getDb();

      const newUser = await db.collection("assignments").insertOne(body);

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

      const assignments = await db.collection("assignments").find({}).toArray();

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

export const PUT = async (req: Request, res: NextApiResponse) => {
  const { searchParams }: any = new URL(req.url);
  const my_param = new ObjectId(searchParams.get("id"));
  console.log(my_param, "zxcvbnsdfghxcvbsdf");

  if (req.method === "PUT") {
    await connectToDatabase();

    try {
      const db = getDb();

      const body = await req.json();

      const assignments = await db
        .collection("assignments")
        .findOne({ _id: my_param });

      if (assignments) {
        assignments.turnIn
          ? assignments.turnIn.push({
              repoLink: body?.repoLink,
              isCheck: false,
              time: new Date(),
              user: body?.user,
            })
          : (assignments.turnIn = [
              {
                repoLink: body?.repoLink,
                isCheck: false,
                time: new Date(),
                user: body?.user,
              },
            ]);
        const result = await db
          .collection("assignments")
          .updateOne({ _id: my_param }, { $set: assignments });

        if (result.modifiedCount === 0) {
          return NextResponse.json(
            { message: "Failed to update the document", data: assignments },
            { status: 500 }
          );
        } else {
          return NextResponse.json(
            { message: "Update Successfully", data: assignments },
            { status: 204 }
          );
        }
      } else {
        return NextResponse.json(
          { message: "data not found", data: assignments },
          { status: 404 }
        );
      }

      // Send success response
    } catch (error: any) {
      // Handle errors
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  } else {
    // Handle other HTTP methods
    return NextResponse.json(
      { message: `Method ${req.method} Not Allowed` },
      { status: 405 }
    );
  }
};
