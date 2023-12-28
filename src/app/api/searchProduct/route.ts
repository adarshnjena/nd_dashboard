import Product from "@/src/models/productModel";
import { connect } from "../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { search } = reqBody;

    const products = await Product.find({
      product_Name: { $regex: search, $options: "i" },
    });
    return NextResponse.json({
      message: "products fetched successfully",
      success: true,
      products,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
  }
}
