import { HttpRequest, HttpResponse } from "../../infra/http/http.adapter";
import { BookDto } from "../dto/book.dto";

export class BooksController {
  constructor() {}

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    const bookParams: BookDto = httpRequest.body;

    try {
      if (!bookParams) {
        return {
          status: 400,
          message: "Missing body",
        };
      }

      return { status: 201, message: "Livro criado com sucesso" };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }
}
