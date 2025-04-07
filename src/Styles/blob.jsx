import { motion, useCycle } from "framer-motion";
import { useEffect } from "react";
export default function Blob({ time = 2, dpath }) {
  const [d, cycle] = useCycle(...dpath);

  useEffect(() => {
    const interval = setInterval(() => {
      cycle();
    }, 2000);
    return () => clearInterval(interval);
  }, [cycle]);
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <svg viewBox="-100 -100 200 200" width="350" height="350">
        <motion.path
          fill="#5c85e6"
          d={d}
          animate={{ d }}
          transition={{ duration: time, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
