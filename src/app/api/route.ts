import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextApiResponse) => {
    return NextResponse.json(
        { message: `Server is Runing` },
        { status: 200 }
      );
  };
  