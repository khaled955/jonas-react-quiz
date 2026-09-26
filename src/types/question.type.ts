 type QuestionLevel = "easy" | "medium" | "hard";

export type Question = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  level: QuestionLevel;
};

export type QuestionsData = {
  questions: Question[];
};
