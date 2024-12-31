import { NextResponse } from "next/server.js";
import { run, AIformatting, PostData } from "../../Components/Help.jsx";

export async function GET(req) {
  try {
    const text = await run();
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
        error: "something wrong happend",
      },
      { staus: 500 },
    );
  }
}
