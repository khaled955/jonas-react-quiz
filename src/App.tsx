import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/main";
import { fetchQuestionsApi } from "./services/question-api-service";
import { Question } from "./types/question.type";
import Loader from "./components/Loader";
import ErrorMessage from "./components/Error-message";
import StartScreen from "./components/start-screen";
// Types
type Action =
  | { type: "dataLoading" }
  | { type: "dataReceived"; payload: Question[] }
  | { type: "dataFailed"; payload: string };

type Status = "loading" | "ready" | "error" | "active" | "finished";
type State = {
  questions: Question[];
  error: string | null;
  status: Status;
};

// Variables
const initialState: State = {
  questions: [],
  error: null,
  status: "loading",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, error: action.payload, status: "error" };

    default:
      throw new Error("unknown action");
  }
}

export default function App() {
  // States
  const [{ error, status, questions }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  // Effects
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const questions = await fetchQuestionsApi();
        dispatch({ type: "dataReceived", payload: questions });
      } catch (error) {
        if (error instanceof Error)
          dispatch({ type: "dataFailed", payload: error.message });
      } finally {
        console.log("");
      }
    }

    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage errorMsg={error!} />}
        {status === "ready" && <StartScreen numQuestions={questions.length} />}
      </Main>
    </div>
  );
}
