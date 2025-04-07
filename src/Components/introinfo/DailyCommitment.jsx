"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../Styles/commitment.css";
import Goals from "./LearningGoals.jsx";
export default function Commitment() {
  const buttons = [
    {
      id: 1,
      label: "Casual",
      text: "Solve challenges when you feel like it. No pressure.",
    },
    {
      id: 2,
      label: "Consistent",
      text: "Steady progress, 1 challenge per day.",
    },
    {
      id: 3,
      label: "Commited",
      text: "Push yourself with 2+ challenges a day",
    },
  ];
  const [hovered, setHovered] = useState(null);

  const [showFirstContent, setShowFirstContent] = useState(true);

  const handleChange = async (commitment) => {
    try {
      const req = await fetch("http://localhost:3000/UserInfo", {
        method: "POST",
        body: JSON.stringify({ commitment: commitment }),
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
            <div className="container">
              <ul>
                {buttons.map((element, index) => (
                  <button
                    className={`buttonc ${hovered === element.id ? "expanded" : ""}`}
                    key={element.id}
                    onClick={() => {
                      handleChange(element);
                      setShowFirstContent(false);
                    }}
                    onMouseEnter={() => setHovered(element.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span>
                      {element.label}
                      <div>
                        {hovered === element.id && (
                          <div className="description">{element.text}</div>
                        )}
                      </div>
                    </span>
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
            <Goals />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
