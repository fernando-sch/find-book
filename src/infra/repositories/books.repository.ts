import mongoose from "mongoose";
import { BookDto } from "../../app/dto/book.dto";
import { BooksRepository } from "../../app/repositories/books.repository";

const booksSchema = new mongoose.Schema({
  title: String,
  isbn: String,
  pageCount: Number,
  publishedData: Date,
  thumbnailUrl: String,
  shortDescription: String,
  longDescription: String,
  status: String,
  authors: [String],
  categories: [String],
});

const Books = mongoose.model("books", booksSchema);

export class BooksRepositoryMongoose implements BooksRepository {
  constructor() {}

  create(dto: BookDto) {
    const books = new Books(dto);

    return books.save;
  }
}
