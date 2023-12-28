import Product from "../../../models/productModel";
import { connect } from "../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log(reqBody);
    const { id } = reqBody;
    console.log(id);
    const product = await Product.findById(id);

    return NextResponse.json({
      message: "clients fetched successfully",
      success: true,
      product,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
  }
}
