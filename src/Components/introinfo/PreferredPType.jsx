import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KnowLanguages from "./KnowLanguages.jsx"
export default function PreferredPType({ ptype }) {
  const [showFirstContent, setShowFirstContent] = useState(true);

  const handleChange = async (type) => {
    console.log("done 1");
    try {
      const req = await fetch("http://localhost:3000/UserInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: type }),
      });
      if (!req.ok) {
        throw new Error(`failed to post type, error code ${req.status}`);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("done");
  };

  return (
    <div className="relative overflow-hidden w-screen h-screen flex items-center justify-center bg-gray-900">
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
            <div>
              <h1 className="title">What's your ideal Project type?</h1>
            </div>
            <ul>
              {ptype.map((element, index) => (
                <button onClick={() => {handleChange(element); setShowFirstContent(false)}} key={index}>
                  {element}
                </button>
              ))}
            </ul>
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
               
              <KnowLanguages/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
