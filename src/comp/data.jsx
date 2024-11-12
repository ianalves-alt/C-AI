"use client";
import { useEffect, useState } from "react";

export default function Shit() {
  const [aiData, setData] = useState("");
  const [response, setresponse] = useState("");
  useEffect(() => {
    const fetchaiResponse = async () => {
      try {
        const response = await fetch("api/getdata");
        const result = await response.json();
        setData(result.prompt.initial);
        console.log(
          result,
          "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiii120398391283091283912839812093819023890183918290381092389038091820321803120938102983901283918209312098",
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchaiResponse();
  }, []);

  return (
    <>
      <div>{aiData}</div>
    </>
  );
}
