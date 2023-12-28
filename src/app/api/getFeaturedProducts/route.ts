import Product from "@/src/models/productModel";
import { connect } from "../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const products = await Product.find({
      featured: true,
    });

    return NextResponse.json({
      status: 200,
      data: products,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
  }
}
