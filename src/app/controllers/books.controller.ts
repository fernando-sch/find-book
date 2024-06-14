import { HttpRequest, HttpResponse } from "../../infra/http/http.adapter";
import { BookDto } from "../dto/book.dto";
import { BooksUseCase } from "../userCases/books.user.case";

export class BooksController {
  constructor(private readonly booksUseCase: BooksUseCase) {}

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    const bookParams: BookDto = httpRequest.body;

    try {
      const response = await this.booksUseCase.createBook(bookParams);

      return {
        status: 201,
        message: "Book Created",
        data: response,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  async find(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto: BookDto = httpRequest.query.title;

    try {
      const response = await this.booksUseCase.findBook(dto);

      return {
        status: 200,
        message: "Book Founded",
        data: response,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    const bookParams: BookDto = httpRequest.body;
    const id: string = httpRequest.params.id;

    try {
      const response = await this.booksUseCase.updateBook(bookParams, id);

      return {
        status: 200,
        message: "Book Updated",
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
