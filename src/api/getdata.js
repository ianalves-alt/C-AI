import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  dotenv.config({ path: ".env.local" });
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);

  const filePath = path.resolve("./lastOutput.json");

  let templateOutput =
    "Hi Gemini, I'm studying C programming. Please give me a project idea focused specifically on C programming that is slightly harder than the last one I did. Include a description, what I'll improve with it, example output, and keep it under 100 words.";
  let initialPrompt =
    "Hi Gemini, I'm starting with C programming. Project Idea: Write a program that prints Hello, World! to the console. Description: Helps you understand the basic structure of a C program, including the use of the main function and printf for output. Improvement: Develops understanding of program structure and basic output. Example Output: Hello, World! give me a project as easy as that";

  let tooEasy =
    "The last project was too easy. Please give me a slightly harder C programming project idea, again focused on C, last project for context: ";
  let tooHard =
    "The last project was too hard. Please give me a slightly easier C programming project idea, again focused on C. Previous project for reference: ";

  const mainObj = {
    async getPreviousOutput() {
      try {
        const data = await fs.readFile(filePath, "utf8");
        return JSON.parse(data);
      } catch {
        return null;
      }
    },

    async saveOutput(data) {
      await fs.writeFile(filePath, JSON.stringify(data));
    },

    prompts: {
      initial: initialPrompt,
      template: templateOutput,
      easy: tooEasy,
      hard: tooHard,
    },
    text: "",

    async run() {
      const previousOutput =
        (await this.getPreviousOutput()) || this.prompts.initial;
      console.log("previous output:\n\n", previousOutput, "\n\n\n");

      const prompt = `${this.prompts.template}. Previous output: ${previousOutput}`;
      console.log("prompt sent: \n\n", prompt, "\n\n\n");

      // Use the correct method from the library
      const chat = genAI.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 500,
        },
      });

      const result = await chat.sendMessage(prompt);
      const text = result.response; // Assuming response is already the text
      console.log(text);

      this.text = text;
      await this.saveOutput(text);
    },
  };

  try {
    await mainObj.run(); // Ensure the asynchronous function is awaited
    res.status(200).json({ text: mainObj.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing request" });
  }
}
