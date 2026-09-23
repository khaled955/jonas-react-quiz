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
    case "setStep":
      return { ...state, step: action.payload };

    case "setCount":
      return { ...state, count: action.payload };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };

    case "reset":
      return initialState;

    default:
      throw new Error(`un known action`);
  }
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

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onKeyDown={(e) => {
            if (e.key === "-") e.preventDefault();
          }}
          onChange={(e) => {
            const value = Number.isNaN(e.target.value);
            if (value) return;
            dispatch({ type: "setStep", payload: Number(e.target.value) });
          }}
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
