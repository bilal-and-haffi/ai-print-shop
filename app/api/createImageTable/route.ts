// Call this by going to localhost:3000/api/createImageTable
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  try {
    const result = await sql`
    CREATE TABLE IF NOT EXISTS image (
      id SERIAL PRIMARY KEY,
      prompt TEXT UNIQUE NOT NULL,
      printify_image_id TEXT NOT NULL,
      printify_image_url TEXT NOT NULL,
      printify_product_id TEXT NOT NULL
    );
  `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
