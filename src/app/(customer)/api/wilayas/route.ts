import path from "path";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import { Wilaya } from "@/lib/wilaya";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "data", "wilayas.json");

  try {
    const buffer = await fs.readFile(filePath, { encoding: "utf-8" });
    const wilayas: Wilaya = JSON.parse(buffer);
    return NextResponse.json(wilayas, { status: 200 });
  } catch (error) {
    console.error("Error reading or parsing the JSON file:", error);
    return NextResponse.json(
      { error: "Error reading or parsing the JSON file" },
      { status: 500 }
    );
  }
}
