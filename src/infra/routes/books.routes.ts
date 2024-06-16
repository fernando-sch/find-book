import { Router } from "express";
import { BooksController } from "../../app/controllers/books.controller";
import { routerAdapter } from "./router.adapter";
import { BooksUseCase } from "../../app/userCases/books.user.case";
import { BooksRepositoryMongoose } from "../repositories/books.repository";

export const BookRoutes = (router: Router) => {
  const booksUseCase = new BooksUseCase(new BooksRepositoryMongoose());
  const booksControler = new BooksController(booksUseCase);

  router.post("/books", routerAdapter(booksControler, "create"));
  router.get("/books", routerAdapter(booksControler, "search"));
  router.put("/books/:id", routerAdapter(booksControler, "update"));
};
