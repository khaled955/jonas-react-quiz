import data from "../data/questions.json";

export function GET() {
  return Response.json(data.questions);
}
