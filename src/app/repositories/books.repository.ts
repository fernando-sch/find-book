import { BookDto } from "../dto/book.dto";

// Abstraction of our Repository on infra layer
// Because inner layer can't communicate directly with outer layers
export abstract class BooksRepository {
  abstract create(dto: BookDto): void;
}
