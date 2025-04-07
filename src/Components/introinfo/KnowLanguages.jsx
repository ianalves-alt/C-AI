"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Commitment from "./DailyCommitment.jsx";

export default function KnowLanguages() {
  const buttons = [
    "Never",
    "I know the basics",
    "I've built small projects",
    "I'm experienced",
  ];

  const [showFirstContent, setShowFirstContent] = useState(true);

  const handleChange = async (cBefore) => {
    try {
      const req = await fetch("http://localhost:3000/UserInfo", {
        method: "POST",
        body: JSON.stringify({ cBefore: cBefore }),
      });

      if (!req.ok) {
        throw new Error(
          `Failed to post \"coded before\", error code: ${req.status}`,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showFirstContent ? (
          <motion.div
            key="content1"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full flex items-center justify-center text-white text-3xl"
          >
            <h1 className="title">Have you ever coded before?</h1>
            <div>
              <ul>
                {buttons.map((element, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleChange(element);
                      setShowFirstContent(false);
                    }}
                  >
                    {element}
                  </button>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content2"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full flex items-center justify-center text-white text-3xl"
          >
            <Commitment></Commitment>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
