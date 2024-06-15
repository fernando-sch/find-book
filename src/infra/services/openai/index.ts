import OpenAI from "openai";
import { HttpException } from "../../../types/http.exception";

export const generateEmbeddings = async (input: string) => {
  const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const response = await openAi.embeddings.create({
      input,
      model: "text-embedding-ada-002",
    });

    return response.data[0].embedding;
  } catch (error: any) {
    throw new HttpException(600, error.message);
  }
};
