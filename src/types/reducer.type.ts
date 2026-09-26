import { Question } from "./question.type";

export type Action =
  | { type: "dataReceived"; payload: Question[] }
  | { type: "dataFailed"; payload: string }
  | { type: "start" }
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "restart" }
  | { type: "tick" };

type Status = "loading" | "ready" | "error" | "active" | "finished";
export type State = {
  questions: Question[];
  error: string | null;
  status: Status;
  index: number;
  answer: null | number;
  points: number;
  highScore: number;
  secondsRemaining: number;
};
