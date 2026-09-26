import { Question as QuestionType } from "../types/question.type";
import { Action } from "../types/reducer.type";
import Options from "./options";

type QuestionProps = {
  question: QuestionType;
  dispatch: React.Dispatch<Action>;
  answer: number | null;
};
export default function Question({
  question,
  dispatch,
  answer,
}: QuestionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
