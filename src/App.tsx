import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Question } from "./types/question.type";

export default function App() {
  const [questions, setQuestion] = useState([]);

  useEffect(() => {
    async function getQuestions() {
      const response = await fetch(import.meta.env.VITE_API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const data = await response.json();
      console.log(data);
      setQuestion(data);
    }

    getQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      {questions?.map((q: Question) => (
        <p>{q.question}</p>
      ))}
    </div>
  );
}
