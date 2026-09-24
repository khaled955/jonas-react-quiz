type StartScreenProps = {
  numQuestions: number;
};
export default function StartScreen({ numQuestions = 1 }: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3> {numQuestions} questions to test your React masterys</h3>
      <button className="btn btn-ui">Let's Start</button>
    </div>
  );
}
