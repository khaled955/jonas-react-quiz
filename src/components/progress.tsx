type ProgressProps = {
  index: number;
  numQuestions: number;
  points: number;
  maxPossiblePoints: number;
  answer: number | null;
};

export default function Progress({
  index = 1,
  numQuestions = 1,
  points = 0,
  maxPossiblePoints = 0,
  answer,
}: ProgressProps) {
  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions} />

      <p>
        Question
        <strong>
          {index + 1} / {numQuestions}
        </strong>
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}
