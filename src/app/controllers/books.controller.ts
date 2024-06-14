import { HttpRequest, HttpResponse } from "../../infra/http/http.adapter";
import { BookDto } from "../dto/book.dto";
import { BooksUseCase } from "../userCases/books.user.case";

export class BooksController {
  constructor(private readonly booksUseCase: BooksUseCase) {}

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    const bookParams: BookDto = httpRequest.body;

    try {
      if (!bookParams) {
        return {
          status: 400,
          message: "Missing body",
        };
      }

      const response = await this.booksUseCase.createBook(bookParams);

      return {
        status: 201,
        message: "Livro criado com sucesso",
        data: response,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }
}
