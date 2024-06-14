import { BookEntity } from "../../domain/entities/book.entity";
import { BookDto } from "../dto/book.dto";

// Abstraction of our Repository on infra layer
// Because inner layer can't communicate directly with outer layers
export abstract class BooksRepository {
  abstract create(dto: BookDto): void;
  abstract find(dto: BookDto): Promise<BookEntity | null>;
  abstract update(dto: BookDto, id: string): Promise<BookEntity | null>;
}
