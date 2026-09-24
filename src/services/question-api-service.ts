import { Question } from "../types/question.type";

export async function fetchQuestionsApi(): Promise<Question[]> {
  const resp = await fetch(import.meta.env.VITE_API_URL);

  if (!resp.ok) throw new Error("Error during fetch questions!");

  const data = await resp.json();

  return data;
}
