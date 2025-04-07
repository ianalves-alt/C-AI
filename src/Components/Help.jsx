import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({ path: "/env.local" });
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
const getPrompt = async (userFeedback) => {
  const [data, feedback] = await Promise.all([getData(), Number(userFeedback)]);

  let basePrompt =
    "Give me a C programming project"; /* = "give me a C programming project";*/

  // 0 = base prompt
  if (feedback === 0) {
    basePrompt += `base the project following a pattern of linear difficulty, assume the person never coded before, and base it on the last projects: ${JSON.stringify(
      data.data.previousPrompts,
    )}, make it one clean paragraph explaining new concepts, descriptions and without special formatting, just one clean paragraph, each project should introduce a new concept for a aspiring programmer based on the last projects, focus on slow progression, youre an ai that helps people that know nothing about programming learn by doing projects each day, so, based on the given previous prompts, give a project to teach the clueless person, a new, simple compared to the last one, concept the new concept must not use concepts not given yet, it must be a ladder where you cant show something you didnt covered yet`;
  }

  if (feedback === 3) {
    basePrompt = `The last project was too hard. Suggest an easier one. Last project was: ${
      data.data.recentPrompt
    }, and the last 5(or less) projects were: ${JSON.stringify(
      data.data.previousPrompts,
    )}`;
  }
  //3 means it was to hard
  if (feedback === 1) {
    basePrompt = `The last project was too easy. Suggest a slightly harder one. Last project was: ${
      data.data.recentPrompt
    }, and the last 5(or less) projects were: ${JSON.stringify(
      data.data.previousPrompts,
    )}`;
  }
  if (!data.data.recentPrompt) {
    basePrompt = "I'm new to programming. Suggest a very simple project in C.";
  }
  //1 means it was too easy
  basePrompt +=
    ", be really descriptive, and make it simple to understand, keep under 100 words if possible, clean text without special formatting, just a clean string of text, include what will the user improve with the project, and example output of program, as how project should be used by other people. the project should follow a pattern of showing a concept at a time, without showing concepts that need other concepts that you didnt show yet, and the concepts should be the core of C coding, teach the particularities of the C language and how to use them, with each concept, dont be stuck on projects programming by itself, but new language concepts, and how to use them";

  return basePrompt;
};

export const PostData = async (data) => {
  const res = await fetch("http://localhost:3000/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: data }),
  });

  if (!res.ok) {
    console.error(`failed to Post, status code: ${res.status}`);
  } else {
    const data = await res.json();
  }
};

export const patchData = async (difficultyLevel, newPrompt) => {
  const res = await fetch("http://localhost:3000/api", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newPrompt: newPrompt,
      difficultyLevel: difficultyLevel,
    }),
  });
  if (!res.ok) {
    console.error(`failed to patch, status code: ${res.status}`);
  } else {
    const data = await res.json();
  }
};
export const run = async (feedback) => {
  const genai = new GoogleGenerativeAI(process.env.api_key);

  const model = await genai.getGenerativeModel({ model: "gemini-2.0-flash" });
  const chat = await model.startChat({
    history: [],
    generationconfig: {
      maxoutputtokens: 500,
    },
  });
  const prompt = await getPrompt(feedback);

  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  const text = await response.text();

  await patchData("_", text);
  return text;
};
export const AIformatting = async (text) => {
  const genAI = new GoogleGenerativeAI(process.env.api_key);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 500,
      response_mime_type: "application/json",
    },
  });
  const prompt = `follow the pattern(each one is describing the concept covered in a C programming project) and answer in the same format: "project print to console ": "basic printing to console"/ "project number guessing": "conditional statements"/${text}: ...?. just answer with the third one. `;
  const result = await chat.sendMessage(prompt);

  const response = result.response;
  const formatted = response.text();
  return formatted;
};
