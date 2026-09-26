import React from "react";
import Button from "./button";
import { Action, Level } from "../types/reducer.type";
import { Question } from "../types/question.type";

type StartScreenProps = {
  numQuestions: number;
  dispatch: React.Dispatch<Action>;
  filteredQuestions: Question[];
};

export default function StartScreen({
  numQuestions = 1,
  dispatch,
  filteredQuestions,
}: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>

      <h3>{numQuestions} questions to test your React mastery</h3>

      <div className="level-filter">
        <label htmlFor="level">Choose difficulty</label>

        <select
          id="level"
          className="level-select"
          onChange={(e) =>
            dispatch({ type: "filter", payload: e.target.value as Level })
          }
        >
          <option value="all">All Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <Button
        onClick={() => dispatch({ type: "start", payload: filteredQuestions })}
      >
        Let's Start
      </Button>
    </div>
  );
}
