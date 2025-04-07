"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroFinish from "../IntroFinish.jsx";

export default function Goals() {
  const buttons = [
    "Freelance Job",
    "Build a pernoal portfolio",
    "Tech Start-up",
    "Career shift to Data Science",
    "Client-side web-apps",
    "Backend Mastery",
    "Build an open-source Project",
    "Certifications/Exams",
  ];

  const [showFirstContent, setShowFirstContent] = useState(true);

  const handleChange = async (Goal) => {
    try {
      const req = await fetch("http://localhost:3000/UserInfo", {
        method: "POST",
        body: JSON.stringify({ Goal: Goal }),
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
            <IntroFinish />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
