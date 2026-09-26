import { useEffect } from "react";
import { Action } from "../types/reducer.type";

type TimerProps = {
  secondsRemaing: number;
  dispatch: React.Dispatch<Action>;
};
export default function Timer({ secondsRemaing, dispatch }: TimerProps) {
  //Variables
  const mins = Math.floor(secondsRemaing / 60);
  const seconds = secondsRemaing % 60;

  // Effects
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [dispatch]);
  return (
    <div className="timer">
      {mins < 10 ? `0${mins}` : mins}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}
