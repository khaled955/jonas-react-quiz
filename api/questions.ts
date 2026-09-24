import type { VercelRequest, VercelResponse } from "@vercel/node";
import data from "../data/questions.json";

export default function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  return res.status(200).json(data.questions);
}