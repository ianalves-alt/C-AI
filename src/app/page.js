"use client";
import Intro from "@/Components/Intro";
import OverAll from "@/Components/OverAll";
import { useEffect, useState } from "react";
export default function MPage() {
  const show = true;
  const setShow = (hi) => {
    console.log(hi);
  };

  useEffect(() => {
    if (!localStorage.getItem("introSeen")) {
      setShow(true);
    }
  }, []);
  const handleIntroFinish = () => {
    localStorage.setItem("introSeen", "true");
    setShow(false);
  };
  return (
    <>
      {show && <Intro onFinish={handleIntroFinish}></Intro>}

      {!show && <OverAll></OverAll>}
    </>
  );
}
