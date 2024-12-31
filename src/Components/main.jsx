"use server";
import Content from "./Content";
import { run, AIformatting, PostData } from "./Help.jsx";

export default async function MainF() {
  const text = await run(); // Runs AI to get a new project suggestion

  AIformatting(text).then((formattedText) => {
    PostData(formattedText); // Sends the formatted response back to the API
  });

  return (
    <div className="wrapperMain">
      <div className="text">
        <Content text={text} />
      </div>
    </div>
  );
}
