import { connect } from "../../../dbConfig/dbConfig";
import Product from "../../../models/productModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      product_Name,
      brand_Name,
      category,
      category2,
      mediaURL,
      about,
      form,
      composition,
    } = reqBody;

    const newProduct = new Product({
      product_Name,
      brand_Name,
      category,
      category2,
      mediaURL,
      about,
      form,
      composition,
    });
    const savedProduct = await newProduct.save();
    return NextResponse.json({
      message: "product created successfully",
      success: true,
      savedProduct,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
