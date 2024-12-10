import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFilePath = path.join(__dirname, "data", "a.json");
/*async function getPreviousOutput() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

async function saveOutput(data) {
  await fs.writeFile(filePath, JSON.stringify(data));
*/
//this is not useful anymore, the update will be handled here with api route

export async function GET(req) {
  console.log("Data file path:", dataFilePath);
  try {
    let data = {};
    try {
      const filecontents = await fs.readFile(dataFilePath, "utf-8");
      console.log("File contents:", filecontents);
      if (filecontents.trim() !== "") {
        data = JSON.parse(filecontents);
      } else {
        console.error("File is empty.");
      }
    } catch (err) {
      console.error("Error reading or parsing file:", err);
    }

    // Ensure a valid structure is returned
    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Error processing request" },
      { status: 500 },
    );
  }
}

export async function PATCH(req, res) {
  const { newPrompt, difficultyLevel } = await req.json();
  let data = {};

  try {
    const filecontents = await fs.readFile(dataFilePath, "utf-8");
    if (filecontents !== "") {
      data = JSON.parse(filecontents);
    }
  } catch (error) {
    console.error("error reading:", error);
    data = {};
  }

  data.previousPrompt = newPrompt;

  data.difficultyLevel = difficultyLevel;
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
    return NextResponse.json({ message: "Prompt updated successfully" });
  } catch (err) {
    console.error("error writing to file", "  ", err);
    return NextResponse.json(
      { message: "Error updating the prompt" },
      { status: 500 },
    );
  }
}
/*async run() {
      const previousOutput =
        (await getPreviousOutput()) || this.prompts.initial;
      const prompt = `${this.prompts.template}. Previous output: ${previousOutput}`;

      const chat = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 500,
        },
      });

      const result = await chat.sendMessage(prompt);
      this.text = result.response;
      await saveOutput(this.text);
    },
  };

  */
