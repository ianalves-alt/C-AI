import "@/Styles/main.css";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Text from "./Text";

dotenv.config({ path: "/env.local" });

const getPrompt = async (difficultyLevel, userFeedback) => {
  let data = await getData();
  let basePrompt = "Hi Gemini, I'm studying C programming.";
  basePrompt += `Please give me a project idea focused on C programming, based on the last prompt: (${data.data.previousPrompt}`;
  if (userFeedback === 3) {
    basePrompt =
      "The project you gave me was too hard, Make it easier than the last project ";
  } else if (userFeedback === 1) {
    basePrompt = "Make it just a step harder";
  }

  if (!data.data.previousPrompt) {
    basePrompt =
      "Hi Gemini, I'm starting with C programming, keep it as simple as the following project. Project Idea: Write a program that prints Hello, World! to the console. Description: Helps you understand the basic structure of a C program, including the use of the main function and printf for output. Improvement: Develops understanding of program structure and basic output. Example Output: Hello, World! give me a project as easy as that";
  }
  basePrompt +=
    " Include a description, what I'll improve with it, example output, and keep it under 100 words.";
  return basePrompt;
};
//1 = too easy/ 2 = medium/ 3 = hard
const getData = async () => {
  const req = await fetch("http://localhost:3000/api", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await req.json();
  return data;
};
const patchData = async (difficultyLevel, feedback) => {
  const res = await fetch("http://localhost:3000/api", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newPrompt: getPrompt(difficultyLevel, feedback),
      difficultyLevel: difficultyLevel,
    }),
  });
  if (!res.ok) {
    console.error(`failed to patch, status code: ${res.status}`);
  } else {
    const data = await res.json();
    console.log(
      "Data updated successfully:",
      data,
      "if this works first try im gay", //for the matter it did not
    );
  }
};

/*async run() {
      const previousOutput =
        (await this.getPreviousOutput()) || this.prompts.initial;
      console.log("previous output:\n\n", previousOutput, "\n\n\n");

      const prompt = `${this.prompts.template}. Previous output: ${previousOutput}`;

      console.log("prompt sent: \n\n", prompt, "\n\n\n");

//everything up is already done in getprompt()
//
//
//




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
}*/

const run = async () => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 500,
    },
  });
  const prompt = await getPrompt();
  const result = await chat.sendMessage(prompt);
  const text = result.response;
  return text;
};
export default async function MainF() {
  console.log("hi");
  const data = await getData();

  return (
    <>
      <div className="wrapperMain">
        <div className="text">
          <Text text={data} />
          {run()}
        </div>
        <button type="button" className="chalenge">
          Todays Challenge
        </button>
      </div>
    </>
  );
}
