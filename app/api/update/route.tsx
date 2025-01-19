import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    const { text } = request;

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "app/file", "main.sql");

    fs.writeFileSync(filePath, text);

    return NextResponse.json(
      { message: "Text added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
