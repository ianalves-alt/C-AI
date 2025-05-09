"use client";
import Intro from "@/Components/Intro";
import OverAll from "@/Components/OverAll";
import Blob from "../Styles/blob.jsx";
import { useEffect, useState, createContext } from "react";
import "../Styles/global.css";
export const Context = createContext();
export default function MPage() {
  const d1 = [
    "M35.2,-52.9C49.3,-45.6,67.2,-42.2,76.9,-31.9C86.6,-21.6,88.1,-4.3,82.3,9.4C76.5,23.1,63.4,33.3,52.5,44.8C41.5,56.2,32.7,68.8,21.9,69.7C11.1,70.6,-1.6,59.8,-12.7,52.3C-23.7,44.9,-33.1,40.8,-40.8,34.1C-48.5,27.4,-54.6,18.1,-60.5,6C-66.4,-6,-72.1,-20.8,-70.3,-35.1C-68.4,-49.4,-59,-63.3,-46.1,-71.2C-33.1,-79,-16.5,-80.7,-3,-76C10.5,-71.3,21,-60.1,35.2,-52.9Z",
    "M43.7,-71.9C53.4,-61.7,55.9,-44.2,62.5,-28.8C69.1,-13.4,79.9,-0.2,79.1,12C78.3,24.1,65.9,35.3,54.2,44.9C42.6,54.6,31.7,62.7,18.2,70.6C4.7,78.4,-11.3,85.9,-23,81.2C-34.8,76.5,-42.1,59.7,-48.5,45.7C-54.8,31.7,-60.2,20.6,-61.1,9.2C-62.1,-2.1,-58.6,-13.6,-55.9,-28.1C-53.3,-42.5,-51.4,-59.8,-42.2,-70.3C-33,-80.7,-16.5,-84.4,0.2,-84.7C17,-85.1,33.9,-82.1,43.7,-71.9Z",
    "M35.6,-58.9C45.7,-48.9,53.2,-38.3,62.2,-26.2C71.3,-14,81.9,-0.4,78.5,10C75.1,20.4,57.6,27.6,45.4,36.6C33.3,45.5,26.5,56.3,17.3,59.2C8.1,62,-3.6,56.9,-13.7,51.7C-23.9,46.4,-32.6,41.1,-44.2,34.5C-55.8,27.9,-70.4,20.1,-72.5,10C-74.5,0,-64,-12.2,-56.2,-24.2C-48.4,-36.2,-43.4,-47.9,-34.5,-58.5C-25.6,-69.1,-12.8,-78.5,0,-78.4C12.7,-78.4,25.5,-68.9,35.6,-58.9Z",
    "M40.5,-64.6C51.1,-56.1,57.5,-42.6,61.9,-29.3C66.3,-16,68.7,-2.9,70.3,12.6C72,28.2,73,46.1,64.7,56.6C56.4,67,38.9,69.9,22.5,73.1C6.1,76.3,-9.1,79.7,-24.5,77.7C-39.8,75.8,-55.2,68.5,-65.4,56.7C-75.5,44.9,-80.4,28.6,-76.8,14.6C-73.2,0.7,-61.1,-10.9,-52,-20.8C-42.8,-30.7,-36.6,-38.9,-28.4,-48.6C-20.2,-58.2,-10.1,-69.2,2.4,-73C14.9,-76.7,29.8,-73.1,40.5,-64",
    "M35.2,-52.9C49.3,-45.6,67.2,-42.2,76.9,-31.9C86.6,-21.6,88.1,-4.3,82.3,9.4C76.5,23.1,63.4,33.3,52.5,44.8C41.5,56.2,32.7,68.8,21.9,69.7C11.1,70.6,-1.6,59.8,-12.7,52.3C-23.7,44.9,-33.1,40.8,-40.8,34.1C-48.5,27.4,-54.6,18.1,-60.5,6C-66.4,-6,-72.1,-20.8,-70.3,-35.1C-68.4,-49.4,-59,-63.3,-46.1,-71.2C-33.1,-79,-16.5,-80.7,-3,-76C10.5,-71.3,21,-60.1,35.2,-52.9Z",
  ];
  const d2 = [
    "M30.3,-44.2C42.2,-39.6,56.6,-36,63.3,-27.2C70,-18.4,68.9,-4.3,68.5,11C68.1,26.3,68.3,42.8,60.6,53.5C52.9,64.2,37.3,68.9,22.8,69.4C8.3,69.9,-5,66.2,-19.9,63.7C-34.7,61.1,-51.1,59.8,-62.7,51.5C-74.2,43.2,-81,27.9,-77.7,14.5C-74.5,1.1,-61.3,-10.4,-52.4,-21.4C-43.5,-32.4,-38.9,-43,-30.9,-49.3C-22.9,-55.6,-11.5,-57.7,-1.1,-56C9.2,-54.3,18.5,-48.7,30.3,-44.2Z",
    "M46.3,-74.1C57.6,-64.8,62.8,-47.9,65.3,-32.7C67.7,-17.5,67.5,-3.9,66.7,10.4C65.9,24.7,64.6,39.7,57.1,50.9C49.6,62,36,69.2,22.6,69.7C9.3,70.3,-3.9,64.2,-17.2,59.8C-30.6,55.4,-44.1,52.7,-55.6,45C-67,37.4,-76.4,24.9,-76.6,12.1C-76.9,-0.8,-67.9,-13.8,-58.6,-23.6C-49.3,-33.4,-39.5,-39.9,-29.7,-49.9C-19.9,-60,-9.9,-73.5,3.8,-79.4C17.5,-85.3,35,-83.5,46.3,-74.1Z",
    "M44.2,-64.5C58.1,-59.8,70.7,-48.9,78.8,-34.9C86.9,-20.8,90.5,-3.7,83.8,8.9C77,21.4,59.9,29.2,48.3,41C36.8,52.8,30.8,68.6,20.2,74C9.7,79.4,-5.4,74.6,-21.9,71.2C-38.3,67.9,-56.2,66,-65.1,56.2C-74.1,46.3,-74.1,28.5,-76.1,11.3C-78,-6,-81.9,-22.6,-77.7,-37.1C-73.5,-51.5,-61.3,-63.9,-47,-68.4C-32.7,-72.8,-16.3,-69.4,-0.6,-68.4C15.2,-67.5,30.3,-69.1,44.2,-64.5Z",
    "M30.3,-44.2C42.2,-39.6,56.6,-36,63.3,-27.2C70,-18.4,68.9,-4.3,68.5,11C68.1,26.3,68.3,42.8,60.6,53.5C52.9,64.2,37.3,68.9,22.8,69.4C8.3,69.9,-5,66.2,-19.9,63.7C-34.7,61.1,-51.1,59.8,-62.7,51.5C-74.2,43.2,-81,27.9,-77.7,14.5C-74.5,1.1,-61.3,-10.4,-52.4,-21.4C-43.5,-32.4,-38.9,-43,-30.9,-49.3C-22.9,-55.6,-11.5,-57.7,-1.1,-56C9.2,-54.3,18.5,-48.7,30.3,-44.2Z",
  ];

  const d3 = [
    "M40.4,-60.7C50.5,-56.3,55.6,-42,60.1,-28.5C64.6,-15,68.6,-2.3,70.6,12.8C72.6,27.9,72.6,45.4,63.9,55.3C55.2,65.1,37.8,67.4,22.5,67.8C7.2,68.2,-6,66.9,-19,63.6C-31.9,60.3,-44.6,55,-52.8,45.7C-61,36.4,-64.6,23.1,-62.9,11.2C-61.3,-0.7,-54.3,-11.1,-47.7,-20.2C-41.1,-29.3,-34.9,-36.9,-27,-42.4C-19.1,-47.8,-9.6,-51,2.8,-55.3C15.1,-59.6,30.3,-65.1,40.4,-60.7Z",
    "M43.6,-65.2C56.5,-59.5,66.9,-47.4,68.9,-34.1C71,-20.8,64.5,-6.2,61.7,8.4C58.8,23,59.5,37.6,53.8,49.5C48,61.5,35.8,70.7,21.3,77C6.9,83.3,-9.8,86.6,-21.3,79.9C-32.9,73.2,-39.4,56.5,-46.9,43.2C-54.5,30,-63.1,20.1,-64.9,9.2C-66.7,-1.8,-61.8,-13.9,-55.8,-24.8C-49.7,-35.6,-42.5,-45.2,-33,-52.5C-23.5,-59.7,-11.7,-64.6,1.8,-67.4C15.3,-70.1,30.7,-70.8,43.6,-65.2Z",
    "M35.7,-52.2C47.3,-48.1,58.4,-39.9,62.8,-29C67.2,-18.1,65,-4.6,60.1,6.6C55.3,17.7,48,26.5,42.1,40.6C36.2,54.7,31.9,74.2,20.9,82.8C9.9,91.3,-7.8,88.9,-21.7,81.4C-35.7,73.9,-46,61.3,-57.6,49.2C-69.2,37.1,-82.1,25.4,-84.9,11.7C-87.7,-2,-80.4,-17.7,-72.3,-32C-64.2,-46.3,-55.2,-59.2,-43.1,-63C-30.9,-66.8,-15.4,-61.5,-1.7,-58.9C12.1,-56.2,24.1,-56.3,35.7,-52.2Z",
  ];
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("introSeen")) {
        setShow(true);
      }
    }
  }, []);
  const handleIntroFinish = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("introSeen", "true");
    }
    setShow(false);
  };
  return (
    <>
      <section className="section">
        <div className="blob">
          <div className="blob1">
            <Blob time={3} dpath={d1} color={"#4991e8"}></Blob>
          </div>
          <div className="blob2">
            <Blob time={3} dpath={d2} color={"#867bcf"}></Blob>
          </div>
          <div className="blob3">
            <Blob time={3} dpath={d3} color={"#cc6673"}></Blob>
          </div>
        </div>
      </section>
      {show && (
        <Context.Provider value={handleIntroFinish}>
          <Intro />
        </Context.Provider>
      )}

      {!show && <OverAll></OverAll>}
    </>
  );
}
