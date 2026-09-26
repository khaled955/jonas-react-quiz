import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/main";
import { fetchQuestionsApi } from "./services/question-api-service";
import Loader from "./components/Loader";
import ErrorMessage from "./components/Error-message";
import StartScreen from "./components/start-screen";
import Question from "./components/question";
import { Action, State } from "./types/reducer.type";
// Types

// Variables
const initialState: State = {
  questions: [],
  error: null,
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, error: action.payload, status: "error" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer": {
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? question.points + state.points
            : state.points,
      };
    }
    default:
      throw new Error("unknown action");
  }
}

export default function App() {
  // States
  const [{ error, status, questions, index, answer }, dispatch] = useReducer(
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
        {status === "ready" && (
          <StartScreen numQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}
