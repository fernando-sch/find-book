import { generateEmbeddings } from "../../infra/services/openai/generate.embeddings";
import { searchOpenAI } from "../../infra/services/openai/search";
import { BookDto } from "../dto/book.dto";
import { BooksRepository } from "../repositories/books.repository";

export class BooksUseCase {
  private booksRepository: BooksRepository;

  constructor(booksRepository: BooksRepository) {
    this.booksRepository = booksRepository;
  }

  async createBook(dto: BookDto) {
    const dataEmbedding = {
      title: dto.title,
      categories: dto.categories,
      author: dto.authors,
      longDescription: dto.longDescription,
    };

    const embeddings = await generateEmbeddings(JSON.stringify(dataEmbedding));

    return this.booksRepository.create({ ...dto, embeddings });
  }

  async searchBooks(search: string) {
    const embeddings = await generateEmbeddings(search);
    const searchResponse = await searchOpenAI(search);

    return this.booksRepository.search(embeddings, searchResponse);
  }

  async updateBook(dto: BookDto, id: string) {
    const dataEmbedding = {
      title: dto.title,
      categories: dto.categories,
      author: dto.authors,
      longDescription: dto.longDescription,
    };

    const embeddings = await generateEmbeddings(JSON.stringify(dataEmbedding));

    return this.booksRepository.update({ ...dto, embeddings }, id);
  }
}
