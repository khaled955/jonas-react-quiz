import { useReducer } from "react";

// Types
type State = {
  count: number;
  step: number;
};

type Action =
  | { type: "inc" }
  | { type: "dec" }
  | { type: "reset" }
  | { type: "setCount"; payload: number }
  | { type: "setStep"; payload: number };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };

    case "setStep":
      return { ...state, step: action.payload };
    case "setCount":
      return { ...state, count: action.payload };
    case "reset":
      return initialState;

    default:
      break;
  }
  return state;
}

const initialState: State = {
  count: 0,
  step: 1,
};

function DateCounter() {
  // States
  const [{ count, step }, dispatch] = useReducer(reducer, initialState);

  //Variables
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  // Handlers
  // const dec = function () {
  //   // setCount((count) => count - step);
  // };

  // const inc = function () {
  //   // setCount((count) => count + step);
  // };

  // const defineCount = function () {
  //   // setCount(Number(e.target.value));
  // };

  // const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
  //   // setStep(Number(e.target.value));
  // };

  const reset = function () {
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) =>
            dispatch({ type: "setStep", payload: Number(e.target.value) })
          }
        />
        <span>{step}</span>
      </div>

      <div>
        <button
          onClick={() => {
            dispatch({ type: "dec" });
          }}
        >
          -
        </button>
        <input
          value={count}
          onChange={(e) =>
            dispatch({ type: "setCount", payload: Number(e.target.value) })
          }
        />
        <button onClick={() => dispatch({ type: "inc" })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
