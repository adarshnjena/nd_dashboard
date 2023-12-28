import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig";
import Product from "../../../models/productModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      _id,
      product_Name,
      brand_Name,
      category,
      category2,
      mediaURL,
      about,
      trending,
      featured,
      form,
      composition,
    }: {
      _id: string;
      product_Name: string;
      brand_Name: string;
      category: string;
      category2: string;
      mediaURL: string;
      about: string;
      trending: boolean;
      featured: boolean;
      form: string;
      composition: string;
    } = reqBody.productData;

    const result = await Product.updateOne(
      { _id: _id },
      {
        $set: {
          product_Name: product_Name,
          brand_Name: brand_Name,
          category: category,
          category2: category2,
          mediaURL: mediaURL,
          about: about,
          trending: trending,
          featured: featured,
          form: form,
          composition: composition,
        },
      }
    );
    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "client not found" }, { status: 400 });
    }
    return NextResponse.json({
      message: "client updated successfully",
      success: true,
      result,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
