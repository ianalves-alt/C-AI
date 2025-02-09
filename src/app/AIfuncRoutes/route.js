import { NextResponse } from "next/server.js";
import { run, AIformatting, PostData } from "../../Components/Help.jsx";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const difficulty = searchParams.get("difficulty");
  try {
    const text = await run(difficulty);
    const formattedText = await AIformatting(text);
    await PostData(formattedText);
    return NextResponse.json({
      success: true,
      text: text,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Something wrong happend.",
      },
      { status: 500 }
    );
  }
}
