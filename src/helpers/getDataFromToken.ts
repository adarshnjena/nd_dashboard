import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export default function getDataFromToken(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";
    const data: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return data.username;
  } catch (err: any) {
    return { error: err.message };
  }
}
