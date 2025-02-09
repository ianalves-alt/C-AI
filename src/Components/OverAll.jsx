"use client";
import { useEffect, useState } from "react";
import Content from "./Content";
import Navbar from "./nav";

export default function OverAll() {
  return (
    <>
      <div>
        <Navbar></Navbar>
        <Content />
      </div>
    </>
  );
}
