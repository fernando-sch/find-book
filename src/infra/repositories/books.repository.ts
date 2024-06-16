import mongoose from "mongoose";
import { BookDto } from "../../app/dto/book.dto";
import { BooksRepository } from "../../app/repositories/books.repository";
import { BookEntity } from "../../domain/entities/book.entity";
import { GptResponse } from "../services/openai/search";

const booksSchema = new mongoose.Schema({
  title: String,
  isbn: String,
  pageCount: Number,
  publishedData: { $date: Date },
  thumbnailUrl: String,
  shortDescription: String,
  longDescription: String,
  status: String,
  authors: [String],
  categories: [String],
  embeddings: [Number],
});

const Books = mongoose.model("books", booksSchema);

export class BooksRepositoryMongoose implements BooksRepository {
  constructor() {}

  create(dto: BookDto) {
    const books = new Books(dto);

    return books.save;
  }

  async search(
    embedding: number[],
    matchBooks: GptResponse
  ): Promise<BookEntity[] | null> {
    const response = await Books.aggregate([
      {
        $vectorSearch: {
          index: "embeddings",
          limit: 10,
          numCandidates: 20,
          queryVector: embedding,
          path: "embeddings",
        },
      },
      {
        $match: {
          $or: [
            { title: new RegExp(matchBooks.title, "i") },
            { authors: new RegExp(matchBooks.authors, "i") },
            { categories: new RegExp(matchBooks.categories, "i") },
            { longDescription: new RegExp(matchBooks.longDescription, "i") },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          isbn: 1,
          pageCount: 1,
          publishedData: 1,
          thumbnailUrl: 1,
          shortDescription: 1,
          longDescription: 1,
          status: 1,
          authors: 1,
          categories: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ]);

    return response;
  }

  async update(dto: BookDto, id: string): Promise<BookEntity | null> {
    const response = await Books.findByIdAndUpdate(id, dto);
    return response ? response.toObject() : null;
  }
}
