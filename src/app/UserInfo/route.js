import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFilePath = path.join(__dirname, "data", "data.json");

export async function POST(req) {
  try {
    const { name, lang } = await req.json();
    let data = [];

    try {
      const datafile = await fs.readFile(dataFilePath, "utf-8");
      data = datafile.trim() ? JSON.parse(datafile) : [];
    } catch (error) {
      console.error(error);
    }
    data.push({ name, lang });

    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, error: "Error processing request" },
      { status: 500 }
    );
  }
}
