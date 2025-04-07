import { useContext } from "react";
import { Context } from "../app/page.js";
import "../Styles/finish.css";
export default function IntroFinish() {
  const onFinish = useContext(Context);
  console.log(typeof onFinish);
  return (
    <>
      <div className="finish">
        <h1>All done!</h1>
        <p className="finishSub">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor
          pretium sapien et malesuada. Nam eros odio, lobortis non luctus sit
          amet, congue eget neque. Proin augue dolor, tristique sed.
        </p>
      </div>
      <button
        onClick={() => {
          onFinish();
        }}
      >
        finish
      </button>
    </>
  );
}
