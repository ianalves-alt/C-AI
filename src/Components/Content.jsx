"use client";
import "@/Styles/main.css";
import { Suspense, useEffect, useMemo, useState } from "react";

const resourceCache = new Map();
export default function Content() {
  //variables
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [condition, setCondition] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [count, setCount] = useState(0);

  const fetchFromAPI = async (difficulty) => {
    const response = await fetch(
      `http://localhost:3000/AIfuncRoutes?difficulty=${difficulty}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error("Response was not ok");
    }
    return response.json();
  };

  const creatResourse = (fetcher) => {
    let state = "pending";
    let result;
    let suspender = fetcher()
      .then((data) => {
        state = "complete";
        result = data;
      })
      .catch((error) => {
        state = "error";
        result = error;
      });
    return {
      read() {
        if (state === "pending") throw suspender;
        if (state === "error") throw result;
        return result;
      },
    };
  };
  const fetchRes = (difficulty) => {
    if (!resourceCache.has(difficulty)) {
      resourceCache.set(
        difficulty,
        creatResourse(() => fetchFromAPI(difficulty))
      );
    }
    return resourceCache.get(difficulty);
  };
  const handleDiffChange = (ndifficulty) => {
    if (difficulty === ndifficulty) {
      setCount((prev) => prev + 1);
    } else {
      setDifficulty(ndifficulty);
      setCount(0);
    }
  };

  const ContentSuspense = ({ difficulty }) => {
    const cacheKey = `${difficulty}-${count}`;
    if (!resourceCache.has(cacheKey)) {
      resourceCache.set(
        cacheKey,
        creatResourse(() => fetchFromAPI(difficulty))
      );
    }
    const resource = resourceCache.get(cacheKey);
    const data = resource.read();
    return <div>{data.text}</div>;
  };
  return (
    <>
      <div className="wrapperMain">
        {!condition && (
          <button
            className="chalenge"
            onClick={() => {
              setCondition(true);
              setDifficulty(0);
            }}
          >
            Today&apos;s Challenge
          </button>
        )}
        {condition && (
          <>
            <Suspense fallback={<div>loading...</div>}>
              {difficulty !== null && (
                <ContentSuspense
                  difficulty={difficulty}
                  key={`${difficulty}-${count}`}
                />
              )}
            </Suspense>

            <div className="buttons">
              <div className="buttontext">How hard was this challenge?</div>
              <button className="button" onClick={() => handleDiffChange(1)}>
                easy
              </button>
              <button
                className="button"
                onClick={() => console.log("medium pressed, fix this later")}
              >
                medium
              </button>
              <button
                className="button"
                onClick={() => {
                  handleDiffChange(3);
                  console.log("hard pressed, fix this later");
                }}
              >
                hard
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
