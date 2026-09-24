type Question = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export type QuestionsData = {
  questions: Question[];
};
