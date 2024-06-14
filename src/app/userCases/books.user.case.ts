import { BookDto } from "../dto/book.dto";
import { BooksRepository } from "../repositories/books.repository";

export class BooksUseCase {
  private booksRepository: BooksRepository;

  constructor(booksRepository: BooksRepository) {
    this.booksRepository = booksRepository;
  }

  async createBook(dto: BookDto) {
    return this.booksRepository.create(dto);
  }

  async findBook(dto: BookDto) {
    return this.booksRepository.find(dto);
  }

  async updateBook(dto: BookDto, id: string) {
    return this.booksRepository.update(dto, id);
  }
}
