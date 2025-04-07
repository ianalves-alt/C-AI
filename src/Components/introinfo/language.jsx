"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PreferredPType from "./PreferredPType";

export default function Language() {
  
  const [lang, setLang] = useState("Select");
  //this is just the language
  
  
  const [invalid, setInvalid] = useState(false);
  //condition to see if the user tries to send some invalid input
  
  const [projectType, setProjectType] = useState([]);
  //this is the {lang} projectType, if java then ["System Programming", "Android Apps", "Web Apps"] for example

  const [showFirstContent, setShowFirstContent] = useState(true);
  //this is just the transition from one component to another
  const [isSubmitting, setIsSubmitting] = useState(false);
  //it prevents the user to click a billion times and send a billion requests

  const languageToProjects = {
    Select: "",
    javascript: ["Web Apps", "Game Dev", "Algorithms", "Shell Scripting"],
    typescript: ["Web Apps", "Game Dev", "Algorithms"],
    python: ["Data Science", "Machine Learning", "Automation", "Algorithms"],
    java: ["System Programming", "Android Apps", "Web Apps"],
    c: ["System Programming", "Embedded Systems", "Algorithms"],
    cpp: ["Game Dev", "System Programming", "Algorithms"],
    csharp: ["Game Dev", "Web Apps", "System Programming"],
    go: ["System Programming", "Web Apps", "Networking"],
    rust: ["System Programming", "Embedded Systems", "Blockchain"],
    swift: ["iOS Apps", "Game Dev"],
    kotlin: ["Android Apps", "Web Apps"],
    php: ["Web Apps", "Backend Development"],
    ruby: ["Web Apps", "Automation"],
    dart: ["Flutter Apps", "Web Apps"],
    haskell: ["Functional Programming", "Algorithms"],
    r: ["Data Science", "Machine Learning"],
    lua: ["Game Dev", "Scripting"],
    gdscript: ["Game Dev"],
    sql: ["Database Management"],
    bash: ["Shell Scripting", "Automation"],
    powershell: ["Automation", "Scripting"],
  };
  //a big object for each language, and its respectives types of projects
  const handleChangeSubmit = async () => {
    
    try {
      const response = await fetch("http://localhost:3000/UserInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lang: lang }),
      });
      if (!response.ok) {
        throw new Error(`failed to Post, status code: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };    //the only function, how efficient(do not count the event handlers functions xp)            
  const handleDenial = () => {
    setTimeout(() => {
      setInvalid(false);
    }, 3000);
  };
  return (
    <>
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
                <h1>Which programming languange do you want to learn?</h1>
                <div>
                  <select onChange={(e) => {
                    setLang(e.target.value)
                    if(languageToProjects[e.target.value]){
                      setProjectType(languageToProjects[e.target.value])
                    }else{
                      setProjectType([])
                    }
                  }}>
                    {Object.keys(languageToProjects).map((lang) => (
                      <option key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </option>
                    ))}
                  </select>
                  {invalid && <p>Select a valid programming language</p>}
                  <button
                    onClick={() => {
                      if (lang === "Select") {
                        setInvalid(true);
                        handleDenial();
                      } else {
                        handleChangeSubmit()
                        setShowFirstContent(false);
                      }
                    }}
                    disabled={isSubmitting || invalid}
                  >
                    Next
                  </button>
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
                <PreferredPType ptype={projectType}/>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
