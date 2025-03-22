"use client";

import "@/Styles/intro.css";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Name from "./introinfo/Name";

export default function Intro({ onFinish }) {
  const [showFirstContent, setShowFirstContent] = useState(true);

  return (
    <div className="relative overflow-hidden w-screen h-screen flex items-center justify-center bg-gray-900">
      <AnimatePresence mode="wait">
        {showFirstContent ? (
          <motion.div
            key="content1"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full flex items-center justify-center text-white text-3xl"
          >
            <div className="intro-container">
              <div className="titleIntro">
                <div className="header">
                  <div className="be-the">Be the </div>
                  <div className="best"> best</div>
                </div>
                <div className="learning">you could ever be.</div>
              </div>

              <div className="subtitle">
                Gradually improve your C programming skills by doing daily
                challenges of increasing difficulty!
              </div>
              <div className="textExplanationContainer">
                <div className="textExplanationTitle">What is Panko?</div>
                <div className="textExplanation">
                  WellAI is a learning tool designed to help you break free from
                  tutorial hell and truly master programming by doing. Every
                  day, you&apos;ll receive a coding challenge tailored to your
                  skill level, ensuring you&apos;re always progressing at the
                  right pace.
                </div>
              </div>

              <button
                className="introduce"
                onClick={() => setShowFirstContent(false)}
              >
                Start learning now
              </button>
            </div>
            <div className="footer">
              <footer>powered by </footer>
              <div className="imagediv">
                <Image
                  src="https://logospng.org/download/google-gemini/google-gemini-256.png"
                  width={60}
                  height={60}
                  alt="Gemini AI"
                  className="geminiLogo"
                />
              </div>
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
            <Name />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
