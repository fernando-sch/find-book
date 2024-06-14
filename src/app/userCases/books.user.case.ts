import { BookDto } from "../dto/book.dto";
import { BooksRepository } from "../repositories/books.repository";

export class BooksUseCase {
  private booksRepository: BooksRepository;

  constructor(booksRepository: BooksRepository) {
    this.booksRepository = booksRepository;
  }

  async createBook(dto: BookDto) {
    this.booksRepository.create;
  }
}
