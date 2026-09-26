import { Question } from "../types/question.type";
import { Action } from "../types/reducer.type";

type OptionsProps = {
  question: Question;
  dispatch: React.Dispatch<Action>;
  answer: number | null;
};

export default function Options({ question, dispatch, answer }: OptionsProps) {
  // Variables
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          disabled={hasAnswer}
          onClick={() => {
            dispatch({ type: "newAnswer", payload: index });
          }}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswer ? (index === question.correctOption ? "correct" : "wrong") : ""}`}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
