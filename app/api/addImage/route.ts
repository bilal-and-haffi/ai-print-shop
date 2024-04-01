import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("prompt");
  const printifyImageId = searchParams.get("printifyImageId");
  const url = searchParams.get("url");
  const productId = searchParams.get("productId");

  try {
    if (!prompt || !printifyImageId)
      throw new Error("prompt and printifyImageId required");
    await sql`INSERT INTO image (prompt, printify_image_id, printify_image_url, printify_product_id) VALUES (${prompt}, ${printifyImageId}, ${url}, ${productId});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const image = await sql`SELECT * FROM image;`;
  return NextResponse.json({ image }, { status: 200 });
}
