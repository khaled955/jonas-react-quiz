import React from "react";
import Button from "./button";
import { Action } from "../types/reducer.type";

type StartScreenProps = {
  numQuestions: number;
  dispatch: React.Dispatch<Action>;
};
export default function StartScreen({
  numQuestions = 1,
  dispatch,
}: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3> {numQuestions} questions to test your React masterys</h3>
      <Button onClick={() => dispatch({ type: "start" })}> Let's Start</Button>
    </div>
  );
}
