import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';


export const POST =async (req:Request, res : NextApiResponse) => {
    
    const user = await req.json()
    console.log(user);

    const token :any = jwt.verify(user.token, "totla");

    console.log(token);
    

    if(token.userId === user.user._id){
        console.log("suuccesssss");
        return  NextResponse.json(
            { message: "User login successfully "  , token,},
            { status: 200 }
          );
    }

    

    return  NextResponse.json(
        { message: "Invalid Token"  , token,},
        { status: 401 }
      );
    
}