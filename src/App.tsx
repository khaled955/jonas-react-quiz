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

// Initial State
const initialState: State = {
  questions: [],
  quizQuestions: [],
  error: null,
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 0,
  filterBy: "all",
};

// Reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        error: action.payload,
        status: "error",
      };

    case "filter":
      return {
        ...state,
        filterBy: action.payload,
      };

    case "start":
      return {
        ...state,
        quizQuestions: action.payload,
        status: "active",
        index: 0,
        answer: null,
        points: 0,
        secondsRemaining: action.payload.length * SECS_PER_QUESTION,
      };

    case "newAnswer": {
      const question = state.quizQuestions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    }

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highScore: Math.max(state.highScore, state.points),
      };

    case "restart":
      return {
        ...state,
        quizQuestions: [],
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        secondsRemaining: 0,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining <= 1 ? "finished" : state.status,
      };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  // State
  const [
    {
      error,
      status,
      questions,
      quizQuestions,
      index,
      answer,
      points,
      highScore,
      secondsRemaining,
      filterBy,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Filter questions before starting the quiz
  const filteredQuestions =
    filterBy === "all"
      ? questions
      : questions.filter((question) => question.level === filterBy);

  // Calculate values from the actual quiz questions
  const maxPossiblePoints = quizQuestions.reduce(
    (acc, question) => acc + question.points,
    0,
  );

  const displayNextButton =
    status === "active" && index < quizQuestions.length - 1;

  const displayFinishButton =
    status === "active" && index === quizQuestions.length - 1;

  // Fetch Questions
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const questions = await fetchQuestionsApi();

        dispatch({
          type: "dataReceived",
          payload: questions,
        });
      } catch (error) {
        if (error instanceof Error) {
          dispatch({
            type: "dataFailed",
            payload: error.message,
          });
        }
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
          <StartScreen
            numQuestions={filteredQuestions.length}
            filteredQuestions={filteredQuestions}
            dispatch={dispatch}
          />
        )}

        {status === "active" && (
          <>
            <Progress
              answer={answer}
              maxPossiblePoints={maxPossiblePoints}
              index={index}
              points={points}
              numQuestions={quizQuestions.length}
            />

            <Question
              question={quizQuestions[index]}
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
