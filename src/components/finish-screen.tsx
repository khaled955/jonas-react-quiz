import { Action } from "../types/reducer.type";
import { getResultMessage } from "../utils/get-result-message";
import Button from "./button";

type FinishScreenProps = {
  points: number;
  maxPossiblePoints: number;
  highScore: number;
  dispatch: React.Dispatch<Action>;
};
export default function FinishScreen({
  points = 0,
  maxPossiblePoints = 0,
  highScore = 0,
  dispatch,
}: FinishScreenProps) {
  // Variables
  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> Out of {maxPossiblePoints} (
        {Math.ceil(percentage)} %)
      </p>
      <p style={{ textAlign: "center", fontSize: "20px" }}>
        {getResultMessage(points, highScore, percentage)}
      </p>

      <p className="highscore">
        🥇 Your high score: <strong>{highScore}</strong> points
      </p>
      <Button onClick={() => dispatch({ type: "restart" })}>
        Restart quiz
      </Button>
    </>
  );
}
