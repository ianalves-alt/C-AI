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
const getPrompt = async (difficultyLevel, userFeedback) => {
  let data = await getData();
  let basePrompt = "give me an C programming project.";

  if (userFeedback === 3) {
    basePrompt = "The last project was too hard. Suggest an easier one.";
  } else if (userFeedback === 1) {
    basePrompt =
      "The last project was too easy. Suggest a slightly harder one.";
  } else if (!data.data.recentPrompt) {
    basePrompt = "I'm new to programming. Suggest a very simple project in C.";
  } else {
    basePrompt += ` make it a tiny bit harder than the last project, introducing one concept at a time. last Project: (${data.data.recentPrompt}).`;
  }

  basePrompt += `base the prompt following a pattern of linear difficulty, assume the person never coded before, and base it on the last projects: ${data.data.previousPrompts}, make it one clean paragraph explaining new concepts, descriptions and without special formatting, just one clean paragraph, each project should introduce a new concept for a aspiring programmer based on the last projects, focus on slow progression, youre an ai that helps people that know nothing about programming learn by doing projects each day, so, based on the given previous prompts, give a project to teach the clueless person, a new, simple compared to the last one, concept the new concept must not use concepts not given yet, it must be a ladder where you cant show something you didnt covered yet`;

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
    console.log(
      "Data updated successfully:",
      data,
      "if this works first try im gay", //for the matter it did not
    );
  }
};
export const run = async () => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 500,
    },
  });
  const prompt = await getPrompt();

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  const text = response.text();

  await patchData("_", text);
  return text;
};
export const AIformatting = async (text) => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
  console.log(formatted);
  return formatted;
};
