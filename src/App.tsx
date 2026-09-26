import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/main";
import { fetchQuestionsApi } from "./services/question-api-service";
import Loader from "./components/Loader";
import ErrorMessage from "./components/Error-message";
import StartScreen from "./components/start-screen";
import Question from "./components/question";
import { Action, State } from "./types/reducer.type";
import Button from "./components/button";
import Progress from "./components/progress";
import FinishScreen from "./components/finish-screen";
import Footer from "./components/footer";
import Timer from "./components/timer";
import { SECS_PER_QUESTION } from "./constants/app.constant";
// Types

// Variables
const initialState: State = {
  questions: [],
  error: null,
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, error: action.payload, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

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
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.highScore > state.points ? state.highScore : state.points,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        highScore: state.highScore,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("unknown action");
  }
}

export default function App() {
  // States
  const [
    {
      error,
      status,
      questions,
      index,
      answer,
      points,
      highScore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Variables
  const maxPossiblePoints = questions.reduce(
    (acc, curr) => acc + curr.points,
    0,
  );
  const displayNextButton = status === "active" && index < questions.length - 1;
  const displayFinishButton =
    status === "active" && index === questions.length - 1;
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
          <>
            <Progress
              answer={answer}
              maxPossiblePoints={maxPossiblePoints}
              index={index}
              points={points}
              numQuestions={questions.length}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
          </>
        )}

        <Footer>
          {status === "active" && (
            <Timer dispatch={dispatch} secondsRemaing={secondsRemaining} />
          )}
          {displayNextButton && (
            <Button onClick={() => dispatch({ type: "nextQuestion" })}>
              Next
            </Button>
          )}
          {displayFinishButton && (
            <Button onClick={() => dispatch({ type: "finish" })}>Finish</Button>
          )}
        </Footer>

        {status === "finished" && (
          <FinishScreen
            highScore={highScore}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
