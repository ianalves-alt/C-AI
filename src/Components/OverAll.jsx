"use client";
import { useEffect, useState } from "react";
import Content from "./Content";
import MainF from "./main";
import Navbar from "./nav";
export default function OverAll() {
  const [text, setText] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("/AIfuncRoutes");
        if (!response.ok) throw new Error("Response was not ok");
        const data = await response.json();
        setText(data.text);
      } catch (error) {
        console.error(error);
      }
    };
    fetchdata();
  }, []);
  return (
    <>
      <div>
        <Navbar></Navbar>
        <Content text={text} />
      </div>
    </>
  );
}
