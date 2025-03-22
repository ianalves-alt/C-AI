"use client";
import "@/Styles/yourName.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Language from "./language";
export default function Name() {
  const [showFirstContent, setShowFirstContent] = useState(true);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setInvalid(true);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/UserInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      });
      if (!response.ok) {
        throw new Error(`failed to Post, status code: ${response.status}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
              <div className="overall">
                <div className="titleOa">
                  <h1 className="titleGet">First, who are You?</h1>
                </div>
              </div>
              <div className="formOa">
                <div className="inputTitle">Your Name</div>
                <form action="submit" onSubmit={handlesubmit}>
                  <div className="inputWrapper">
                    <input
                      className="inputBox"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jhon Doe..."
                    />
                  </div>
                  {invalid && (
                    <div className="error">Please enter your name</div>
                  )}
                  <div className="submitBtnContainer">
                    <button
                      className="submitBtn"
                      type="submit"
                      disabled={isSubmitting}
                      onClick={() => {
                        if (!name) {
                          setInvalid(true);
                        } else {
                          setShowFirstContent(false);
                        }
                      }}
                    >
                      Next
                    </button>
                  </div>
                </form>
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
              <Language />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
