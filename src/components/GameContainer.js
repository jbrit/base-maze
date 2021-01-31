import React, { useState } from "react";
import GamePage from "./GamePage";
import IntroPage from "./IntroPage";
import RegisterPage from "./RegisterPage";

const GameContainer = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [diff, setDiff] = useState("hard");
  const fields = { step, name, diff },
    setFields = { setStep, setName, setDiff };
  switch (step) {
    case 1:
      return <RegisterPage fields={fields} setFields={setFields} />;
    case 2:
      return <IntroPage fields={fields} setFields={setFields} />;
    case 3:
      return <GamePage fields={fields} setFields={setFields} />;

    default:
      return "Nothing on this page";
  }
};

export default GameContainer;
