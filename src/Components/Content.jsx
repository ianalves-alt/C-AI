"use client";

import "@/Styles/main.css";
import { useState } from "react";
export default function Content({ text }) {
  const [show, setShow] = useState(false);
  const T = show ? text : "";
  const buttonText = show ? "Todays challenge" : "";
  return (
    <>
      <div className="wrapperMain">
        <div className="text">
          <div>{T}</div>

          <div>
            <button
              onClick={() => {
                if (show == false) {
                  setShow(true);
                } else {
                  setShow(false);
                }
              }}
              className="chalenge"
              style={{ display: show ? "none" : "block" }}
            >
              Todays Challenge
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
